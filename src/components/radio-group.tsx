"use client";

import { RadioGroup, Stack, Radio } from "@chakra-ui/react";
import React from "react";

export default function ProductRadioGroup({ content }: { content: string[] }) {
  const [value, setValue] = React.useState<string>(content[0]);

  return (
    <RadioGroup onChange={setValue} value={value}>
      <Stack direction="row" wrap={"wrap"}>
        {content.slice(10).map((item, idx) => (
          <Radio key={idx} className="uppercase col-span-2" value={item}>
            {item}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  );
}
