import { Column } from "@react-email/column";
import { Html } from "@react-email/html";
import { Row } from "@react-email/row";
import { Tailwind } from "@react-email/tailwind";
import { Text } from "@react-email/text";

export function OtpEmail(props: any) {
  const { token } = props;

  return (
    <Html lang="en">
      {/* <Button href={url}>Click me</Button> */}
      <Tailwind>
        <Row className=" flex items-center gap-2">
          <Column className="mr-5">
            <Text>Your 2FA code: </Text>
          </Column>
          <Column>
            <Text className=" font-bold text-green-600 ml-5"> {token}</Text>
          </Column>
        </Row>
      </Tailwind>
    </Html>
  );
}
