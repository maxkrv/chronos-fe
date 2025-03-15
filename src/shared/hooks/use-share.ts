import { toast } from 'sonner';

interface Data {
  title: string;
  text: string;
  url?: string;
  message?: string;
}

export const useShare = () => {
  const handleShare = async ({
    title,
    text,
    url = window.location.href,
    message = 'URL has been copied to the clipboard.'
  }: Data) => {
    const shareData = {
      title,
      text,
      url
    };

    if (window.navigator.canShare?.(shareData)) {
      return await window.navigator.share(shareData);
    }

    await window.navigator.clipboard.writeText(url);
    toast(message);
  };

  return handleShare;
};
