"use client";

import * as React from "react";
import { addDays, format, isBefore, startOfDay } from "date-fns";
import { Calendar as CalendarIcon, Users2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

type BookingBarProps = {
  defaultCheckIn?: Date;
  defaultCheckOut?: Date;
  defaultGuests?: number;
  onCheckAvailability?: (payload: {
    checkIn: Date | undefined;
    checkOut: Date | undefined;
    guests: number;
  }) => void;
};

export function BookingBar({
  defaultCheckIn,
  defaultCheckOut,
  defaultGuests = 4,
  onCheckAvailability,
}: BookingBarProps) {
  const today = startOfDay(new Date());

  const [checkIn, setCheckIn] = React.useState<Date | undefined>(
    defaultCheckIn ?? today,
  );

  const [checkOut, setCheckOut] = React.useState<Date | undefined>(
    defaultCheckOut ?? addDays(today, 2),
  );
  const [guests, setGuests] = React.useState<number>(defaultGuests);

  const isBeforeToday = React.useCallback(
    (date: Date) => isBefore(startOfDay(date), today),
    [today],
  );

  const submit = () => {
    // final safety (optional)
    if (!checkIn || !checkOut) return;
    if (checkOut <= checkIn) {
      setCheckOut(addDays(checkIn, 1));
      return;
    }

    onCheckAvailability?.({ checkIn, checkOut, guests });

    console.log({ checkIn, checkOut, guests });
  };

  const handleCheckInChange = (date: Date | undefined) => {
    if (!date) return;

    // guard: no past date
    if (isBeforeToday(date)) return;

    setCheckIn(date);

    // auto-fix invalid checkout
    if (!checkOut || checkOut <= date) {
      setCheckOut(addDays(date, 1));
    }
  };

  const handleCheckOutChange = (date: Date | undefined) => {
    if (!date || !checkIn) return;

    // must be strictly after check-in
    if (date <= checkIn) return;

    setCheckOut(date);
  };

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-5xl rounded-full bg-forest/90 backdrop-blur-md border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.35)] px-3 py-3 h-32 hidden items-center justify-center md:flex">
        <div className="flex items-stretch gap-2 md:gap-3">
          {/* Check In */}
          <DatePill
            icon={<CalendarIcon strokeWidth={1.5} className="size-6" />}
            label="Check In"
            value={checkIn ? format(checkIn, "yyyy-MM-dd") : "—"}
            selected={checkIn}
            onSelect={handleCheckInChange}
            disabled={(date) => isBeforeToday(date)}
          />

          <div className="hidden md:flex items-center">
            <Separator orientation="vertical" className="h-10 bg-white/10" />
          </div>

          {/* Check Out */}
          <DatePill
            icon={<CalendarIcon strokeWidth={1.5} className="size-6" />}
            label="Check Out"
            value={checkOut ? format(checkOut, "yyyy-MM-dd") : "—"}
            selected={checkOut}
            onSelect={handleCheckOutChange}
            // optional: fromDate helps calendar UI start after check-in
            fromDate={checkIn ? addDays(checkIn, 1) : today}
            disabled={(date) => {
              // until check-in picked, block all
              if (!checkIn) return true;

              // also block past dates (just in case)
              if (isBeforeToday(date)) return true;

              // block same day + before check-in
              return date <= checkIn;
            }}
          />

          <div className="hidden md:flex items-center">
            <Separator orientation="vertical" className="h-10 bg-white/10" />
          </div>

          {/* Guests */}
          <GuestsPill guests={guests} setGuests={setGuests} />

          {/* CTA */}
          <div className="ml-auto flex items-center">
            <Button
              onClick={submit}
              className={cn(
                "h-11 rounded-full px-5 md:px-7",
                "bg-pine/90 text-ivory hover:bg-pine",
                "hover:shadow-lg transition-all hover:scale-105 duration-300 ",
              )}>
              Check Availability
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="md:hidden w-[90%] mx-auto h-16 bg-forest/90 backdrop-blur-md border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.35)] rounded-full flex items-center justify-center ">
          <div className="flex items-stretch gap-2 md:gap-3 w-full justify-between px-4">
            {/* Check In */}
            <DatePill
              icon={<CalendarIcon strokeWidth={1.5} className="size-6" />}
              label="Check In"
              value={checkIn ? format(checkIn, "yyyy-MM-dd") : "—"}
              selected={checkIn}
              onSelect={handleCheckInChange}
              disabled={(date) => isBeforeToday(date)}
            />

            <div className=" items-center">
              <Separator orientation="vertical" className="h-10 bg-white/10" />
            </div>

            {/* Check Out */}
            <DatePill
              icon={<CalendarIcon strokeWidth={1.5} className="size-6" />}
              label="Check Out"
              value={checkOut ? format(checkOut, "yyyy-MM-dd") : "—"}
              selected={checkOut}
              onSelect={handleCheckOutChange}
              // optional: fromDate helps calendar UI start after check-in
              fromDate={checkIn ? addDays(checkIn, 1) : today}
              disabled={(date) => {
                // until check-in picked, block all
                if (!checkIn) return true;

                // also block past dates (just in case)
                if (isBeforeToday(date)) return true;

                // block same day + before check-in
                return date <= checkIn;
              }}
            />
          </div>
        </div>
        <div className=" w-[90%] mx-auto h-16 bg-forest/90 backdrop-blur-md border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.35)] rounded-full flex items-center justify-center ">
          <GuestsPill guests={guests} setGuests={setGuests} />
        </div>
        <div className=" w-[90%] mx-auto h-12">
          <Button
            onClick={submit}
            className={cn(
              "w-full h-full rounded-full",
              "bg-pine/90 text-ivory hover:bg-forest",
              "hover:shadow-lg transition-all hover:scale-105 duration-300 ",
            )}>
            Check Availability
          </Button>
        </div>
      </div>
    </div>
  );
}

function DatePill({
  icon,
  label,
  value,
  onSelect,
  selected,
  fromDate,
  disabled,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onSelect: (d: Date | undefined) => void;
  selected?: Date;
  fromDate?: Date;
  disabled?: (date: Date) => boolean;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center gap-3 rounded-full",
            "px-4 md:px-5 h-11",
            "min-w-[155px] md:min-w-[190px]",
          )}>
          <div className="text-white/80">{icon}</div>

          <div className="flex flex-col items-start leading-tight">
            <span className="text-[11px] md:text-lg text-white/80">
              {label}
            </span>
            <span className="text-xs md:text-md text-white/95 font-mono">
              {value}
            </span>
          </div>
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className={cn(
          "w-auto p-3 bg-forest text-white border-white/10",
          "shadow-[0_20px_60px_rgba(0,0,0,0.5)]",
        )}>
        <Calendar
          mode="single"
          selected={selected}
          onSelect={onSelect}
          fromDate={fromDate}
          disabled={disabled}
          initialFocus
          className="text-white"
        />
      </PopoverContent>
    </Popover>
  );
}

function GuestsPill({
  guests,
  setGuests,
}: {
  guests: number;
  setGuests: (n: number) => void;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-full",
        "px-8 md:px-5 h-11",

        "w-full md:min-w-[175px]",
      )}>
      <div className="flex items-center gap-3">
        <div className="text-white/80">
          <Users2 strokeWidth={1.5} className="size-6" />
        </div>

        <div className="flex-1">
          <div className="text-[11px] md:text-lg text-white/80 leading-tight">
            Guest
          </div>
          <div className="text-xs md:text-lg text-white/95 leading-tight">
            <span className="mr-1 font-mono">{guests}</span>
            GUESTS
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => setGuests(Math.max(1, guests - 1))}
          className={cn(
            "h-8 w-8 rounded-full",
            "border-white/15 bg-transparent text-white hover:bg-white/10",
          )}>
          −
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => setGuests(Math.min(20, guests + 1))}
          className={cn(
            "h-8 w-8 rounded-full",
            "border-white/15 bg-transparent text-white hover:bg-white/10",
          )}>
          +
        </Button>
      </div>
    </div>
  );
}
