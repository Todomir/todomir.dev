class InsetBorder {
	static get inputProperties() {
		return ["--border-radius", "--border-width", "--border-color", "--inset"];
	}

	paint(ctx, geom, properties) {
		const borderRadius = parseFloat(properties.get("--border-radius"));
		const borderWidth = parseFloat(properties.get("--border-width"));
		const borderColor = properties.get("--border-color").toString();
		const inset = parseFloat(properties.get("--inset"));

		// Outer border
		ctx.beginPath();
		ctx.lineWidth = borderWidth;
		ctx.strokeStyle = borderColor;
		this.roundRect(ctx, 0, 0, geom.width, geom.height, borderRadius);

		ctx.stroke(); // Stroke the outer border

		// Inset border
		ctx.beginPath();
		ctx.lineWidth = borderWidth;
		// Adjusting the inner border radius to account for the border width
		const innerBorderRadius = Math.max(0, borderRadius - borderWidth); // Ensure it's not going below 0
		this.roundRect(
			ctx,
			inset + borderWidth,
			inset + borderWidth,
			geom.width - 2 * (inset + borderWidth),
			geom.height - 2 * (inset + borderWidth),
			innerBorderRadius,
		);

		ctx.stroke(); // Stroke the inset border
	}

	roundRect(ctx, x, y, width, height, radius) {
		ctx.moveTo(x + radius, y);
		ctx.lineTo(x + width - radius, y);
		ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
		ctx.lineTo(x + width, y + height - radius);
		ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
		ctx.lineTo(x + radius, y + height);
		ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
		ctx.lineTo(x, y + radius);
		ctx.quadraticCurveTo(x, y, x + radius, y);
	}
}

if (typeof registerPaint !== "undefined") {
	registerPaint("inset-border", InsetBorder);
}
