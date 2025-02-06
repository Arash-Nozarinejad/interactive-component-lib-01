import { Link } from "./atoms/Link/Link";

export function LinkComponentExamples() {
    return (
      <div className="flex flex-col gap-4">
        {/* Default Link */}
        <Link href="#default">Default Link</Link>
  
        {/* Button Style Link */}
        <Link href="#button" variant="button">
          Button Style Link
        </Link>
  
        {/* Subtle Link */}
        <Link href="#subtle" variant="subtle">
          Subtle Link
        </Link>
  
        {/* Underlined Link */}
        <Link href="#underline" variant="underline">
          Underlined Link
        </Link>
  
        {/* Different Sizes */}
        <div className="flex gap-4 items-center">
          <Link href="#" size="sm">Small Link</Link>
          <Link href="#" size="md">Medium Link</Link>
          <Link href="#" size="lg">Large Link</Link>
        </div>
  
        {/* External Link */}
        <Link href="https://example.com" external>
          External Link
        </Link>
  
        {/* Disabled Link */}
        <Link href="#" disabled>
          Disabled Link
        </Link>
  
        {/* External Link without Icon */}
        <Link href="https://example.com" external showExternalIcon={false}>
          External Link (No Icon)
        </Link>
      </div>
    );
  }