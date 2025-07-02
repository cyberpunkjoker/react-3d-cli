import { OpenTypeEnum, ShareSocialMedia, SocialMediaEnum } from "@/utils/handleSocialMedia";
import { Button } from "antd";
import React from "react";

const SharePage: React.FC = () => {

  const shareToX = () => {
    new ShareSocialMedia({
      mediaType: SocialMediaEnum.X,
      shareInfo: {
        url: "https://www.baidu.com",
        text: "share to x",
      },
      openType: OpenTypeEnum.CURRENT,
    })
  }

  return (
    <div>
      <Button onClick={shareToX} type="primary">share to x</Button>
    </div>
  )
}

export default SharePage;