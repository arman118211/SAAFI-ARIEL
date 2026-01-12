import { messaging } from "../config/firebase.js";

export const sendFcmNotification = async ({
	tokens,
	title,
	body,
	data = {},
}) => {
	console.log("calling message");
	if (!tokens || tokens.length === 0) return [];

	const message = {
		notification: {
			title,
			body,
		},

		data: {
			...data,
			click_action: data.url,
		},

		webpush: {
			notification: {
				title,
				body,
				icon: "https://demo.saafiariel.com/logo.jpg", // Must be absolute URL
				image: data.imageUrl || "https://demo.saafiariel.com/logo.jpg", // The large image
				badge: "https://demo.saafiariel.com/logo.jpg", // Small icon in status bar
			},
			fcm_options: {
				link: data.url, // Standard way to handle clicks in modern FCM
			},
		},
		tokens,
	};

	const response = await messaging.sendEachForMulticast(message);
	return response;
};
