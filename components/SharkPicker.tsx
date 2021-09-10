import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  IconButton,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Field } from "formik";
import Image from "next/image";
import React from "react";

export interface Shark {
  key: string;
  alt: string;
  src: string;
  desc: string;
}

export const sharks: Shark[] = [
  {
    key: "great_white",
    alt: "Great White Shark",
    src: "/great-white-shark.jpg",
    desc: "Male great whites on average measure 3.4 to 4.0 m (11 to 13 ft) long, while females at 4.6 to 4.9 m (15 to 16 ft). Adults of this species weigh 522–771 kg (1,151–1,700 lb) on average. Great whites are commonly found in all major oceans.",
  },
  {
    key: "hammerhead",
    alt: "Hammerhead Shark",
    src: "/hammerhead.jpg",
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
  shark_id: Shark,
  left: (() => void) | false,
  right: (() => void) | false
) => {
  return (
    <VStack alignItems="stretch">
      <Box>
        <Image
          src={shark_id.src}
          alt={shark_id.alt}
          width="2500"
          height="1669"
        />
      </Box>
      <Text fontSize="sm" color="gray">
        {shark_id.desc}
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

interface SharkPickerProps {
  shark_index: number | undefined;
  set_shark_index: (a: number | undefined) => void;
}

export const SharkPicker: React.FC<SharkPickerProps> = ({
  shark_index,
  set_shark_index,
}) => {
  // let [shark_index, set_shark_index] = React.useState<number | undefined>();
  const left =
    shark_index === 0 || shark_index === undefined
      ? null
      : () => set_shark_index(shark_index! - 1);
  const right =
    shark_index === sharks.length || shark_index === undefined
      ? null
      : () => set_shark_index(shark_index! + 1);
  //         onSelectionChange={(id) =>
  //   set_shark_index(sharks.findIndex((obj) => obj.key == id))
  // }
  // selectedKey={
  //   shark_index != undefined ? sharks[shark_index].key : shark_index
  // }
  return (
    <VStack spacing="4">
      <Field as={Select} label="Shark Type">
        <option key="great_white">Great White Shark</option>
        <option key="hammerhead">Hammerhead Shark</option>
      </Field>
      {shark_index != undefined
        ? SharkImageCarousel(sharks[shark_index], left, right)
        : null}
    </VStack>
  );
};
