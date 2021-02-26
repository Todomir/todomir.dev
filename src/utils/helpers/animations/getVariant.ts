export default function getVariant(
  mounted: boolean,
  variant: Record<string, unknown>
) {
  return !mounted && variant
}
