import {
	Body,
	Button,
	Container,
	Head,
	Hr,
	Html,
	Link,
	Preview,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";

interface MagicLinkEmailProps {
	magicLink: string;
}

export default function MagicLinkEmail({ magicLink }: MagicLinkEmailProps) {
	return (
		<Html>
			<Head />
			<Preview>Sign in to The Lost Pet Project</Preview>
			<Tailwind>
				<Body className="bg-[#b4b5af] py-12 font-sans">
					<Container className="mx-auto bg-white/90 p-8 max-w-[600px] border border-gray-200 rounded-xl shadow-lg">
						{/* Header with Logo */}
						<Section className="text-center mb-8">
							<div className="flex items-center justify-center gap-4">
								<div className="h-14 w-14 text-[#1C1C1C]">
									<svg viewBox="0 0 512 512" fill="currentColor">
										<title>Lost Pet Project Logo</title>
										<path d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z" />
									</svg>
								</div>
								<div className="flex flex-col items-start">
									<h1 className="text-3xl font-bold uppercase tracking-widest leading-none text-[#1C1C1C] font-sans mt-0 mb-0.5">
										Lost Pet
									</h1>
									<span className="text-xl font-medium uppercase tracking-wider leading-none text-gray-600 font-sans">
										Project
									</span>
								</div>
							</div>
						</Section>

						<Text className="text-gray-700 text-lg mb-6 text-center font-sans">
							Click the button below to sign in to your account.
						</Text>

						<Section className="text-center my-10">
							<Button
								href={magicLink}
								className="bg-[#1C1C1C] hover:bg-gray-800 inline-block py-4 px-8 text-lg font-semibold text-white rounded-lg no-underline text-center transition-all duration-200 shadow-md hover:shadow-lg font-sans cursor-pointer"
							>
								Sign In Now
							</Button>
						</Section>

						<Hr className="border-gray-200 my-8" />

						{/* Info Messages Grouped in a Subtle Box */}
						<Section className="flex justify-center">
							<div
								className="rounded-lg px-6 py-4 max-w-[420px] w-full"
								style={{ backgroundColor: "#e9eae7" }}
							>
								<Text className="text-gray-700 text-[15px] text-center font-sans mb-2 leading-snug">
									If you didn't request this sign in you can ignore this email.
								</Text>
								<Text className="text-gray-600 text-[15px] text-center font-sans mt-0 leading-snug">
									This link will expire in 5 minutes. If it does, you can
									always&nbsp;
									<Link
										href="https://lost.pet/login"
										className="text-[#1C1C1C] underline hover:text-gray-800 font-medium"
									>
										request a new login link
									</Link>
									.
								</Text>
							</div>
						</Section>

						{/* Footer separated by extra spacing and muted style */}
						<Hr className="border-gray-200 my-10" />
						<Section className="mt-6 text-center">
							<Text className="text-gray-400 text-xs mb-2 font-sans">
								The Lost Pet Project – Helping reunite pets with their families
							</Text>
							<Link
								href="https://lost.pet"
								className="text-gray-500 hover:text-gray-700 text-xs font-sans underline"
							>
								Visit lost.pet
							</Link>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
