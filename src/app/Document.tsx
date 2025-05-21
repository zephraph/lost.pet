import styles from "./styles.css?url";

export const Document: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => (
	<html lang="en">
		<head>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<title>Lost Pet Project</title>
			<link rel="modulepreload" href="/src/client.tsx" />
			<link href={styles} rel="stylesheet" />
		</head>
		<body>
			<div className="sticky top-0 z-50 bg-yellow-400 p-2 text-center text-sm font-medium shadow-md">
				🚧 This site is currently in preview mode and is still under
				construction 🚧
			</div>
			<div id="root">{children}</div>
			<script>import("/src/client.tsx")</script>
		</body>
	</html>
);
