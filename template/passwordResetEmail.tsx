import { Html } from "@react-email/html";
import { Tailwind } from "@react-email/tailwind";
import { Text } from "@react-email/text";

export function PasswordResetEmail(props: any) {
  const { text } = props;

  return (
    <Html lang="en">
      {/* <Button href={url}>Click me</Button> */}
      <Tailwind>
        <Text className="">{text}</Text>
      </Tailwind>
    </Html>
  );
}
