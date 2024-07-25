"use client";
import { Button } from "@/components/ui/button";
import { useContexts } from "@/contexts/Context";
// import { useContexts } from "@/contexts/Context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Dropdown {
  value: string;
  label: string;
}
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CommandList } from "cmdk";

function DropdownItem({
  items = [],
  placeholder,
  onSelect,
}: {
  items: Dropdown[];
  placeholder: string;
  onSelect: Function;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  console.log("prop", items);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? items.find((item) => item.value === value)?.label
            : "Select " + placeholder}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {items != undefined &&
              items.map((item) => (
                <CommandList>
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {item.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === item.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                </CommandList>
              ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

const HomePage = () => {
  const router = useRouter();
  const { spendingTypes, systemTags } = useContexts()!;
  useEffect(() => {
    if (window.location.pathname === "/homepage") {
      router.push("/");
    }
  }, []);
  useEffect(() => {
    console.log(spendingTypes);
    console.log(systemTags);

    // const ctx = useContexts();
  }, [spendingTypes, systemTags]);
  return (
    <div className="flex justify-between">
      <div>dashboard</div>
      <div>
        <div>
          <Button>เพิ่มรายการ</Button>
          (
          <DropdownItem
            items={spendingTypes.map<Dropdown>((x: any) => {
              return {
                value: x.SpendingTypeId,
                label: x.NameTh,
              };
            })}
            placeholder="Select an item"
            onSelect={() => {}}
          />
          )
          <DropdownItem
            items={systemTags.map<Dropdown>((x: any) => {
              return {
                value: x.TagId,
                label: x.NameTh,
              };
            })}
            placeholder="Select an item"
            onSelect={() => {}}
          ></DropdownItem>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
