export function HeaderCTAs() {
	return (
		<div className="flex gap-4">
			<a
				href="/report-lost"
				className="rounded-lg bg-rose-600/90 px-6 py-3 text-lg font-semibold text-white/95 shadow-lg hover:shadow-rose-600/20 hover:bg-rose-700 hover:-translate-y-0.5 hover:scale-102 active:translate-y-0 active:scale-98 transition-all duration-150"
			>
				Report Lost Pet
			</a>
			<a
				href="/report-sighting"
				className="rounded-lg bg-emerald-600/90 px-6 py-3 text-lg font-semibold text-white/95 shadow-lg hover:shadow-emerald-600/20 hover:bg-emerald-700 hover:-translate-y-0.5 hover:scale-102 active:translate-y-0 active:scale-98 transition-all duration-150"
			>
				Report Sighting
			</a>
		</div>
	);
}
