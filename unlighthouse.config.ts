import { defineConfig } from "unlighthouse";

export default defineConfig({
	site: "localhost:8788",
	lighthouseOptions: {
		skipAudits: ["is-crawlable"],
	},
});
