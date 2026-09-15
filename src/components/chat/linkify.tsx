// Turns plain http(s) URLs inside a chat message into clickable links —
// e.g. the Google Maps link Della IA includes when answering an address
// question — without touching how the rest of the message renders and
// without dangerouslySetInnerHTML (the text stays plain React children,
// never parsed as HTML).
const URL_SPLIT_REGEX = /(https?:\/\/[^\s]*[^\s.,;:!?)\]}'"<>])/g;
const URL_TEST_REGEX = /^https?:\/\/[^\s]*[^\s.,;:!?)\]}'"<>]$/;

export function linkifyText(text: string) {
  return text.split(URL_SPLIT_REGEX).map((part, i) =>
    URL_TEST_REGEX.test(part) ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-navy-300 underline-offset-2 break-all"
      >
        {part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}
