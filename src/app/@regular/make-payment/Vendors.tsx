import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguageStore } from "@/stores/languageStore";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { DUMMY_FAVOURITES, DUMMY_NEAR_YOU, Vendor } from "./data";

type Props = {
  onSelect: (merchantOrbId: string) => void;
};

function Vendors({ onSelect }: Props) {
  const { data: t } = useLanguageStore();
  const [search, setSearch] = useState("");

  const favourites = useMemo(
    () =>
      DUMMY_FAVOURITES.filter(
        (vendor) =>
          vendor.name
            .toLocaleLowerCase()
            .includes(search.trim().toLocaleLowerCase()) ||
          vendor.orbId.includes(search.trim()),
      ),
    [search],
  );
  const nearYou = useMemo(
    () =>
      DUMMY_NEAR_YOU.filter(
        (vendor) =>
          vendor.name
            .toLocaleLowerCase()
            .includes(search.trim().toLocaleLowerCase()) ||
          vendor.orbId.includes(search.trim()),
      ),
    [search],
  );

  const renderVendorCard = (vendor: Vendor) => {
    return (
      <div
        key={vendor.name}
        className="w-20 h-fit flex flex-col items-center justify-center cursor-pointer"
        onClick={() => onSelect(vendor.orbId)}
      >
        <Card className="relative w-20 h-20 flex flex-col">
          <div
            className="flex-grow min-h-12 rounded-t-md bg-secondary bg-center bg-contain bg-no-repeat"
            style={{ backgroundImage: `url("${vendor.imgUrl}")` }}
          />
          <h3 className="bg-primary/5 text-bold text-xs uppercase text-center text-clip line-clamp-2">
            {vendor.name}
          </h3>
        </Card>
      </div>
    );
  };

  return (
    <div className="flex-grow px-8 md:px-4">
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-10 justify-between mb-5">
        <h2 className="text-xl font-bold">{t.vendors.title}</h2>
        <Input
          className="max-w-sm"
          placeholder={t.vendors.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {/* FAVOURITES */}
      <div>
        <h3 className="uppercase mb-2 text-center md:text-left">
          {t.vendors.favourites}
        </h3>
        <div className="flex gap-2 justify-center md:justify-start flex-wrap">
          {favourites.map((vendor) => renderVendorCard(vendor))}
          {favourites.length === 0 && (
            <h3 className="my-4 text-sm opacity-70 text-center md:text-left">
              {t.vendors.fav_not_found}
            </h3>
          )}
        </div>
      </div>
      <Separator className="my-8" />
      {/* NEAR YOU */}
      <div>
        <h3 className="uppercase mb-2 text-center md:text-left">
          {t.vendors.near_you}
        </h3>
        <div className="flex gap-2 flex-wrap justify-center md:justify-start">
          {nearYou.map((vendor, ind) => renderVendorCard(vendor))}
          {nearYou.length === 0 && (
            <h3 className="my-4 text-sm opacity-70 text-center md:text-left">
              {t.vendors.near_you_not_found}
            </h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default Vendors;
