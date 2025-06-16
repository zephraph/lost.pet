export function lazy<T extends object>(fn: () => T): T {
	let instance: T | undefined;

	return new Proxy<T>({} as T, {
		get: (target, prop) => {
			if (!instance) {
				instance = fn();
			}
			return instance[prop as keyof T];
		},
	});
}
