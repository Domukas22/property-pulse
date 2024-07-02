//
//
//

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  WhatsappIcon,
  EmailIcon,
  XIcon,
} from "react-share";

export default function ShareBtns({ property }) {
  const share_URL = `${process.env.NEXT_PUBLIC_DOMAIN}/${property._id}`;

  return (
    <>
      <h3 className="text-xl fond-bold text-center pt-2">Share this property:</h3>
      <div className="flex gap-3 justify-center pb-5">
        <FacebookShareButton
          url={share_URL}
          about={property.name}
          hashtag={`${property.type}ForRest`}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton
          url={share_URL}
          title={property.name}
          hashtags={[`#${property.type}ForRest`]}
        >
          <XIcon size={32} round />
        </TwitterShareButton>
        <WhatsappShareButton url={share_URL} title={property.name} separator=":: ">
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <EmailShareButton
          url={share_URL}
          subject={property.name}
          body={`Check out this property: ${share_URL}`}
        >
          <EmailIcon size={32} round />
        </EmailShareButton>
      </div>
    </>
  );
}
