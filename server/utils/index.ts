export function getEnvVar(name: string): string {
  if (typeof useRuntimeConfig === "function") {
    const rc = useRuntimeConfig();

    return rc[name] || rc.public[name];
  }

  return process.env[name]!;
}
