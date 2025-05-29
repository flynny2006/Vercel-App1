/*
 * @ts-nocheck
 * Preventing TS checks with files presented in the video for a better presentation.
 */
import { MODEL_REGEX, PROVIDER_REGEX } from '~/utils/constants';
import { Markdown } from './Markdown';

interface UserMessageProps {
  content: string | Array<{ type: string; text?: string; image?: string }>;
}

export function UserMessage({ content }: UserMessageProps) {
  if (Array.isArray(content)) {
    const textItem = content.find((item) => item.type === 'text');
    const textContent = stripMetadata(textItem?.text || '');
    const images = content.filter((item) => item.type === 'image' && item.image);

    return (
      <div className="w-full flex items-start justify-start gap-4 p-4 bg-zinc-900 rounded-2xl shadow-lg transition-all">
        <div className="flex flex-col gap-6 w-full">
          {textContent && (
            <div className="text-white text-base leading-relaxed">
              <Markdown html>{textContent}</Markdown>
            </div>
          )}
          {images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((item, index) => (
                <img
                  key={index}
                  src={item.image}
                  alt={`Image ${index + 1}`}
                  className="w-full max-h-[512px] object-contain rounded-xl border border-zinc-700 shadow-md"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  const textContent = stripMetadata(content);

  return (
    <div className="w-full p-4 bg-zinc-900 rounded-2xl shadow-lg text-white text-base leading-relaxed">
      <Markdown html>{textContent}</Markdown>
    </div>
  );
}

function stripMetadata(content: string) {
  const artifactRegex = /<boltArtifact\s+[^>]*>[\s\S]*?<\/boltArtifact>/gm;
  return content.replace(MODEL_REGEX, '').replace(PROVIDER_REGEX, '').replace(artifactRegex, '');
}
