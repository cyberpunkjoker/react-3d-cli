import { openSmallWindow } from "../common";

interface ShareSocialMediaProps {
  mediaType: SocialMediaEnum;
  shareInfo: {
    text: string;
    url: string;
  };
  openType?: OpenTypeEnum;
}

export enum SocialMediaEnum {
  X = "x",
  DISCORD = "discord",
  FACEBOOK = "facebook",
  TELEGRAM = "telegram",
}

export enum OpenTypeEnum {
  WINDOW = "window",
  TAB = "tab",
  CURRENT = "current",
}

/**
 * card 问题需要使用og tags 配置
 * 需要在 ssr 框架中动态实现
 */
export class ShareSocialMedia {
  public mediaType: SocialMediaEnum;
  public shareInfo: {
    text: string;
    url: string;
  };
  public jumpUrl: string | null = null;
  public openType: OpenTypeEnum;

  constructor(props: ShareSocialMediaProps) {
    const { mediaType, shareInfo, openType = OpenTypeEnum.TAB } = props;
    this.mediaType = mediaType;
    this.shareInfo = shareInfo;
    this.openType = openType;

    this.toShare()
    this.openUrl()
  }

  public toShare() {
    const { text, url } = this.shareInfo;

    switch (this.mediaType) {
      case SocialMediaEnum.X:
        this.jumpUrl = this.getXShareUrl(text, url);
        break;

      case SocialMediaEnum.FACEBOOK:
         this.jumpUrl = this.getFacebookShareUrl(text, url)
        break;

      case SocialMediaEnum.TELEGRAM:
        this.jumpUrl = this.getTelegramShareUrl(text, url);
        break;

      default:
        console.log("Invalid media type");
        break;
    }
  }
  
  public openUrl() {
    switch (this.openType) {
      case OpenTypeEnum.WINDOW:
        openSmallWindow(this.jumpUrl);
        break;

      case OpenTypeEnum.TAB:
        this.toJumpShareUrl();
        break;

      default:
        this.toJumpShareUrl('_self');
        break;
    }
  }

  getXShareUrl(text: string, url: string) {
    const xTweetUrl = `https://x.com/intent/post?text=${encodeURIComponent(
      text,
    )}&url=${encodeURIComponent(url)}`;
    return xTweetUrl;
  }

  getFacebookShareUrl(text: string, url: string) {
    const shareUrl = `http://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}
    &t=${encodeURIComponent(text)}`

    return shareUrl;
  }

  getTelegramShareUrl(text: string, url: string) {
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(
      text,
    )}`;
    return shareUrl;
  }

  toJumpShareUrl(target: string = "_blank") {
    if (this.jumpUrl) {
      window.open(this.jumpUrl, target);
    }
  }
}