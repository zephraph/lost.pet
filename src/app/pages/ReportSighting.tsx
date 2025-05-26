import type { RequestInfo } from "rwsdk/worker";
import { Footer } from "../components/Footer";
import { ReportSightingForm } from "../components/ReportSightingForm";

export function ReportSighting({ ctx }: RequestInfo) {
	return (
		<div className="min-h-screen bg-[#1C1C1C] text-white">
			<div className="container mx-auto px-4 py-16">
				<h1 className="mb-8 text-4xl font-bold">Report a Pet Sighting</h1>

				<div className="max-w-2xl">
					<ReportSightingForm />
				</div>
			</div>
			<Footer />
		</div>
	);
}
