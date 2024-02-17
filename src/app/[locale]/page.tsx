import LandingContainer from "@/containers/Landing";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { pick } from "lodash";

export default function Landing() {
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={pick(messages, 'Landing')}>
      <LandingContainer />
    </NextIntlClientProvider>
  );
}
