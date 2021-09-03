import hammerhead from "../assets/images/sharks/hammerhead.jpeg";
import { Box, HStack, IconButton, Image } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import React from "react";
import { useMemo } from "react";

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
    src: hammerhead,
    desc: "",
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
    <>
      <Image src={shark_id.src} alt={shark_id.alt} height="auto" width="100%" />
      <Box>{shark_id.desc}</Box>
      <HStack>
        <IconButton
          aria-label="previous"
          icon={<ChevronLeftIcon />}
          isDisabled={right ? true : false}
          onClick={left ? left : undefined}
          variant="ghost"
        ></IconButton>
        <Box flexGrow={1} />
        <IconButton
          aria-label="next"
          icon={<ChevronLeftIcon />}
          isDisabled={right ? true : false}
          onClick={right ? right : undefined}
          variant="ghost"
        ></IconButton>
      </HStack>
    </>
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
  return (
    <>
      <Picker
        label="Shark Type"
        isRequired
        necessityIndicator="label"
        onSelectionChange={(id) =>
          set_shark_index(sharks.findIndex((obj) => obj.key == id))
        }
        selectedKey={
          shark_index != undefined ? sharks[shark_index].key : shark_index
        }
      >
        <Item key="great_white">Great White Shark</Item>
        <Item key="hammerhead">Hammerhead Shark</Item>
        {/* <Item key="mako">Mako Shark</Item>
                <Item key="blue">Blue Shark</Item>
                <Item key="seven_gill">Sevengill Shark</Item>
                <Item key="soup_fin">Soupfin (Tope or School) Shark</Item>
                <Item key="six_gill">Sixgill Shark</Item>
                <Item key="salmon">Salmon Shark</Item> */}
        {/* <Item key="none">None of the above</Item> */}
      </Picker>
      {shark_index != undefined
        ? SharkImageCarousel(sharks[shark_index], left, right)
        : null}
    </>
  );
};
