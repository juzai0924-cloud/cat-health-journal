(function () {
  const encoder = new TextEncoder(), decoder = new TextDecoder();
  const ITERATIONS = 310000;
  function bytesToBase64(bytes) {
    let binary = "";
    for (let i = 0; i < bytes.length; i += 32768) binary += String.fromCharCode(...bytes.subarray(i, i + 32768));
    return btoa(binary);
  }
  function base64ToBytes(value) {
    if (typeof value !== "string" || value.length > 30_000_000) throw new Error("INVALID_VAULT");
    const binary = atob(value), bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  }
  async function deriveKey(password, salt) {
    if (typeof password !== "string" || password.length < 8 || password.length > 128) throw new Error("INVALID_PASSWORD");
    const material = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveKey"]);
    return crypto.subtle.deriveKey({ name: "PBKDF2", salt, iterations: ITERATIONS, hash: "SHA-256" }, material, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
  }
  async function seal(data, key, salt) {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const plaintext = encoder.encode(JSON.stringify(data));
    const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plaintext);
    return { format: "cat-health-vault", version: 2, kdf: { name: "PBKDF2", hash: "SHA-256", iterations: ITERATIONS, salt: bytesToBase64(salt) }, cipher: { name: "AES-GCM", iv: bytesToBase64(iv), data: bytesToBase64(new Uint8Array(encrypted)) } };
  }
  function validate(vault) {
    if (!vault || vault.format !== "cat-health-vault" || vault.version !== 2 || vault.kdf?.name !== "PBKDF2" || vault.kdf?.hash !== "SHA-256" || vault.kdf?.iterations !== ITERATIONS || vault.cipher?.name !== "AES-GCM") throw new Error("INVALID_VAULT");
    const salt = base64ToBytes(vault.kdf.salt), iv = base64ToBytes(vault.cipher.iv), data = base64ToBytes(vault.cipher.data);
    if (salt.length !== 16 || iv.length !== 12 || !data.length) throw new Error("INVALID_VAULT");
    return { salt, iv, data };
  }
  async function create(data, password) {
    const salt = crypto.getRandomValues(new Uint8Array(16)), key = await deriveKey(password, salt);
    return { vault: await seal(data, key, salt), key, salt };
  }
  async function unlock(vault, password) {
    const parsed = validate(vault), key = await deriveKey(password, parsed.salt);
    const plaintext = await crypto.subtle.decrypt({ name: "AES-GCM", iv: parsed.iv }, key, parsed.data);
    return { data: JSON.parse(decoder.decode(plaintext)), key, salt: parsed.salt };
  }
  window.SecureStore = { create, unlock, seal, validate };
})();
