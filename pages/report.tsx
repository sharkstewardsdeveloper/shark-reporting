import React from "react";
import {
  Container,
  Heading,
  Flex,
  Text,
  Button,
  Stack,
  Input,
  Checkbox,
  Select,
  Divider,
  Textarea,
  VStack,
} from "@chakra-ui/react";

import { Form } from "formik";

export default function Report() {
  return (
    <Flex
      align="start"
      justify="center"
      flexDirection="column"
      width="100%"
      height="100%"
      backgroundColor={[
        "brand.primaryLight",
        "brand.primaryLight",
        "brand.primaryLight",
      ]}
      color={["brand.white", "brand.white", "brand.white"]}
    >
      <VStack align="left" margin="auto" width="lg" height="100%">
        <form>
          <VStack
            align="left"
            spacing="5"
            margin="auto"
            width="lg"
            height="100%"
          >
            <Heading size="md">Report a shark sighting</Heading>
            <VStack align="left">
              <Text>Location:</Text>
              <Input isRequired placeholder="San Francisco Bay" />
              <Checkbox>Use Current Location</Checkbox>
            </VStack>

            <Select isRequired placeholder="Time of day">
              <option value="3:00am">3:00 AM</option>
              <option value="4:00am">4:00 PM</option>
              <option value="5:00am">5:00 AM</option>
              <option value="6:00am">6:00 AM</option>
              <option value="7:00am">7:00 AM</option>
              <option value="8:00am">8:00 AM</option>
              <option value="9:00am">9:00 AM</option>
              <option value="10:00am">10:00 AM</option>
              <option value="11:00am">11:00 AM</option>
              <option value="12:00pm">12:00 PM</option>
              <option value="1:00pm">1:00 PM</option>
              <option value="2:00pm">2:00 PM</option>
              <option value="3:00pm">3:00 PM</option>
              <option value="4:00pm">4:00 PM</option>
              <option value="5:00pm">5:00 AM</option>
              <option value="6:00pm">6:00 PM</option>
              <option value="7:00pm">7:00 PM</option>
              <option value="8:00pm">8:00 PM</option>
              <option value="9:00pm">9:00 PM</option>
              <option value="10:00pm">10:00 PM</option>
              <option value="11:00pm">11:00 PM</option>
              <option value="12:00am">12:00 AM</option>
              <option value="1:00am">1:00 AM</option>
              <option value="2:00am">2:00 AM</option>
            </Select>
            <Divider size="md" />
            <VStack align="left">
              <Text>Additional Information:</Text>
              <Textarea isRequired={false} />
            </VStack>
            <VStack align="left">
              <Text>Email:</Text>
              <Input type="email" inputMode="email" isRequired={false} />
            </VStack>
            <Checkbox>Join the Shark Stewards Newsletter</Checkbox>
            <Button colorScheme="teal" variant="solid" maxWidth="24">
              Report
            </Button>
          </VStack>
        </form>
      </VStack>
    </Flex>
  );
}
