import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  IconButton,
  Select,
  Text,
  VStack,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { Field, FieldConfig, useField, useFormikContext } from "formik";
import Image from "next/image";
import StaticImport from "next/image";
import React from "react";
import { SharkType } from "../model/form_submission";
import great_white_img from "../public/sharks/great-white-shark.jpg";
import hammerhead_img from "../public/sharks/hammerhead.jpg";

export interface Shark {
  key: SharkType;
  name: string;
  img: JSX.Element;
  desc: string;
}

export const sharks: Shark[] = [
  {
    key: SharkType.greatWhite,
    name: "Great White Shark",
    img: <Image src={great_white_img} alt="Great White Shark" />,
    desc: "Male great whites on average measure 3.4 to 4.0 m (11 to 13 ft) long, while females at 4.6 to 4.9 m (15 to 16 ft). Adults of this species weigh 522–771 kg (1,151–1,700 lb) on average. Great whites are commonly found in all major oceans.",
  },
  {
    key: SharkType.hammerhead,
    name: "Hammerhead Shark",
    img: <Image src={hammerhead_img} alt="Hammerhead Shark" />,
    desc: "The hammerhead sharks are a group of sharks, so named for the unusual structure of their heads, which are flattened and laterally extended into a hammer shape. The known species range from 0.9 to 6.0 m (2 ft 11 in to 19 ft 8 in) in length and weigh from 3 to 580 kg (6.6 to 1,278.7 lb). They are usually light gray and have a greenish tint",
  },
  // {
  //     key: "mako",
  //     src: { hammerhead },
  //     desc: ''
  // },
  // {
  //     key: "blue",
  //     src: { hammerhead },
  //     desc: ''
  // },
  // {
  //     key: "blue",
  //     src: { hammerhead },
  //     desc: ''
  // },
  // {
  //     key: 'soup_fin',
  //     src: { hammerhead },
  //     desc: ''
  // },
  // {
  //     key: "six_gill",
  //     src: { hammerhead },
  //     desc: ''
  // },
];

export const SharkImageCarousel = (
  shark: Shark,
  left: (() => void) | false,
  right: (() => void) | false
) => {
  return (
    <VStack alignItems="stretch">
      <Box>{shark.img}</Box>
      <Text fontSize="sm" color="gray">
        {shark.desc}
      </Text>
      <HStack>
        <IconButton
          aria-label="previous"
          icon={<ChevronLeftIcon />}
          isDisabled={!left}
          onClick={left ? left : undefined}
          variant="solid"
        ></IconButton>
        <Box flexGrow={1} />
        <IconButton
          aria-label="next"
          icon={<ChevronRightIcon />}
          isDisabled={!right}
          onClick={right ? right : undefined}
          variant="solid"
        ></IconButton>
      </HStack>
    </VStack>
  );
};

export const SharkPicker: React.FC<FieldConfig> = (props) => {
  const [field, meta, { setValue }] = useField<SharkType>(props);
  const sharkIndex = sharks.findIndex((s) => s.key == field.value);
  // let [shark_index, set_shark_index] = React.useState<number | undefined>();
  const left =
    sharkIndex === 0 || sharkIndex === undefined
      ? null
      : () => setValue(sharks[sharkIndex - 1].key);
  const right =
    sharkIndex === sharks.length - 1 || sharkIndex === undefined
      ? null
      : () => setValue(sharks[sharkIndex + 1].key);
  //         onSelectionChange={(id) =>
  //   set_shark_index(sharks.findIndex((obj) => obj.key == id))
  // }
  // selectedKey={
  //   shark_index != undefined ? sharks[shark_index].key : shark_index
  // }
  return (
    <VStack spacing="2" align="flex-start">
      <Box width="full">
        <FormControl isRequired isInvalid={meta.error && meta.touched}>
          <FormLabel htmlFor="sightingTime">
            What kind of shark did you see?
          </FormLabel>
          <Select
            label="Shark Type"
            onChange={(event) => {
              setValue(event.target.value as SharkType);
            }}
            value={field.value}
          >
            {sharks.map((shark) => (
              <option value={shark.key} key={shark.key}>
                {shark.name}
              </option>
            ))}
          </Select>
          {meta.error && meta.touched ? (
            <FormErrorMessage>{meta.error}</FormErrorMessage>
          ) : null}
        </FormControl>
      </Box>

      {field != undefined
        ? SharkImageCarousel(sharks[sharkIndex], left, right)
        : null}
    </VStack>
  );
};
