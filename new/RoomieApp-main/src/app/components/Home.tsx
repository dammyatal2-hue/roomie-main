import { useState } from "react";
import { MapPin, MessageCircle, Bell, Heart, Home as HomeIcon, ArrowRight, ChevronDown } from "lucide-react";

interface HomeProps {
  onOpenMessages?: () => void;
  onOpenNotifications?: () => void;
  hasUnreadNotifications?: boolean;
  hasUnreadMessages?: boolean;
  onStartMatching?: () => void;
  onBrowseHomes?: () => void;
  onCompletePreferences?: () => void;
}

export function Home({
  onOpenMessages,
  onOpenNotifications,
  hasUnreadNotifications = false,
  hasUnreadMessages = false,
  onStartMatching,
  onBrowseHomes,
  onCompletePreferences,
}: HomeProps) {
  const userName = "Dammy"; // In a real app, this would come from user data
  const currentLocation = "Kicukiro, Kigali";

  // Mock data for recommended roommates
  const recommendedProfiles = [
    {
      id: "1",
      name: "Sarah K.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      compatibility: 92,
      setup: "Looking for roommate",
      chips: ["Quiet", "Clean", "WFH"],
    },
    {
      id: "2",
      name: "Alex M.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      compatibility: 88,
      setup: "Room available",
      chips: ["Social", "Cook", "Early Bird"],
    },
    {
      id: "3",
      name: "Emma R.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      compatibility: 85,
      setup: "Looking for roommate",
      chips: ["Quiet", "WFH", "Pet-friendly"],
    },
  ];

  // Mock data for recommended homes
  const recommendedHomes = [
    {
      id: "1",
      title: "Cozy 2BR in Kicukiro",
      price: "$120",
      location: "Kicukiro",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&h=150&fit=crop",
      listingType: "Private Room · Shared Apartment",
      roommates: 2,
    },
    {
      id: "2",
      title: "Modern Studio Downtown",
      price: "$180",
      location: "City Center",
      image: "https://images.unsplash.com/photo-1502672260066-6bc35f0aafd6?w=200&h=150&fit=crop",
      listingType: "Entire Home",
      roommates: 0,
    },
    {
      id: "3",
      title: "Shared 3BR Apartment",
      price: "$100",
      location: "Gasabo",
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=200&h=150&fit=crop",
      listingType: "Private Room · Shared Apartment",
      roommates: 2,
    },
  ];

  // Determine greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] pb-20">
      {/* Header with Location */}
      <div className="bg-white px-6 pt-8 pb-4">
        <div className="flex items-start justify-between">
          {/* Location */}
          <div className="flex-1">
            <div className="flex items-center gap-[5px] mb-[4px]">
              <p className="font-['Inter:Medium',sans-serif] font-medium text-[12px] leading-[14px] text-[#9da4ae]">
                Location
              </p>
              <ChevronDown className="w-[16px] h-[16px] text-[#fe456a]" />
            </div>
            <div className="flex items-center gap-[4px]">
              <MapPin className="w-[24px] h-[24px] text-[#fe456a] fill-[#fe456a]" />
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] leading-[20px] text-[#1f2a37]">
                {currentLocation}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-[8px]">
            <button
              onClick={onOpenNotifications}
              className="relative w-[44px] h-[44px] bg-white border border-[#d2d6db] rounded-full flex items-center justify-center hover:bg-[#f9fafb] transition-colors"
            >
              <Bell className="w-[20px] h-[20px] text-[#1f2a37]" />
              {hasUnreadNotifications && (
                <span className="absolute top-[6px] right-[6px] w-[6px] h-[6px] bg-[#f04438] rounded-full" />
              )}
            </button>
            <button
              onClick={onOpenMessages}
              className="relative w-[44px] h-[44px] bg-white border border-[#d2d6db] rounded-full flex items-center justify-center hover:bg-[#f9fafb] transition-colors"
            >
              <MessageCircle className="w-[20px] h-[20px] text-[#1f2a37]" />
              {hasUnreadMessages && (
                <span className="absolute top-[6px] right-[6px] w-[6px] h-[6px] bg-[#f04438] rounded-full" />
              )}
            </button>
          </div>
        </div>

        {/* Greeting */}
        <div className="mt-4">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[20px] leading-[24px] text-[#1f2a37] mb-[2px]">
            {getGreeting()}, {userName}
          </p>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px] leading-[18px] text-[#6b7280]">
            Based on your lifestyle preferences
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 py-4 bg-white">
        <div className="flex items-center gap-[8px] px-[16px] py-[14px] bg-white border border-[#d2d6db] rounded-[12px]">
          <svg className="w-[20px] h-[20px] flex-shrink-0" fill="none" viewBox="0 0 20 20">
            <circle cx="9" cy="9" r="7.5" stroke="#fe456a" strokeWidth="1.5" />
            <path d="M14.5 14.5L18.5 18.5" stroke="#fe456a" strokeLinecap="round" strokeWidth="1.5" />
          </svg>
          <input
            type="text"
            placeholder="Search Property"
            className="flex-1 font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[18px] text-[#9da4ae] outline-none bg-transparent"
          />
          <svg className="w-[20px] h-[20px] flex-shrink-0" fill="none" viewBox="0 0 20 20">
            <path
              d="M7.5 13L2 13M10.5 3.5L17 3.5"
              stroke="#fe456a"
              strokeLinecap="round"
              strokeWidth="1.5"
            />
            <circle cx="13.5" cy="13" r="2.5" stroke="#fe456a" strokeWidth="1.5" />
            <circle cx="6.5" cy="3.5" r="2.5" stroke="#fe456a" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      {/* Complete Preferences Card */}
      <div className="px-6 py-3">
        <button
          onClick={onCompletePreferences}
          className="w-full bg-[#fffaeb] border-2 border-[rgba(253,176,34,0.2)] rounded-[12px] p-[18px] flex items-center gap-[12px] hover:shadow-md transition-all"
        >
          <div className="flex-none w-[40px] h-[40px] bg-[#fdb022] rounded-[10px] flex items-center justify-center">
            <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 20 20">
              <path
                d="M7 14.5C7 13.12 5.88 12 4.5 12C3.12 12 2 13.12 2 14.5C2 15.88 3.12 17 4.5 17C5.88 17 7 15.88 7 14.5ZM18 14.5C18 13.12 16.88 12 15.5 12C14.12 12 13 13.12 13 14.5C13 15.88 14.12 17 15.5 17C16.88 17 18 15.88 18 14.5ZM14 5.5C14 4.12 12.88 3 11.5 3C10.12 3 9 4.12 9 5.5C9 6.88 10.12 8 11.5 8C12.88 8 14 6.88 14 5.5ZM7 7L4.5 12M13 7L15.5 12"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.67"
              />
            </svg>
          </div>
          <div className="flex-1 text-left">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] leading-[18px] text-[#1f2a37] mb-[4px]">
              Complete your lifestyle preferences
            </p>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#6b7280]">
              Help us find better matches for you.
            </p>
          </div>
          <ArrowRight className="flex-none w-[20px] h-[20px] text-[#1f2a37]" />
        </button>
      </div>

      {/* Recommended for you */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-[4px]">
          <h2 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] leading-[24px] text-[#1f2a37]">
            Recommended for you
          </h2>
          <button className="font-['Inter:Medium',sans-serif] font-medium text-[12px] leading-[14px] text-[#fe456a]">
            See all
          </button>
        </div>
        <p className="font-['Inter:Medium',sans-serif] font-medium text-[12px] leading-[16px] text-[#9da4ae] mb-[16px]">
          Compatible roommates
        </p>

        {/* Horizontal scroll of profiles */}
        <div className="flex gap-[12px] overflow-x-auto pb-[8px] -mx-6 px-6">
          {recommendedProfiles.map((profile) => (
            <button
              key={profile.id}
              onClick={onStartMatching}
              className="flex-none w-[140px] bg-[#fafafa] rounded-[12px] p-[12px] hover:bg-[#f3f4f6] transition-colors"
            >
              <div className="w-full aspect-square mb-[8px] rounded-[8px] overflow-hidden">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#1f2a37] mb-[4px] truncate">
                {profile.name}
              </p>
              <div className="flex items-center gap-[4px] mb-[6px]">
                <Heart className="w-[10px] h-[10px] text-[#fe456a] fill-[#fe456a]" />
                <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] leading-[14px] text-[#fe456a]">
                  {profile.compatibility}% match
                </span>
              </div>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[10px] leading-[14px] text-[#9da4ae] mb-[6px] truncate">
                {profile.setup}
              </p>
              {/* Lifestyle chips */}
              <div className="flex flex-wrap gap-[4px]">
                {profile.chips.slice(0, 2).map((chip, index) => (
                  <span
                    key={index}
                    className="px-[6px] py-[2px] bg-[#f3f4f6] rounded-[4px] font-['Inter:Medium',sans-serif] font-medium text-[9px] leading-[12px] text-[#6b7280]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Top Locations - keeping existing design but styled to match */}
      <div className="px-6 py-4 bg-white border-y border-[#f3f4f6]">
        <div className="flex items-center justify-between mb-[16px]">
          <h2 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] leading-[24px] text-[#1f2a37]">
            Top Locations
          </h2>
          <button className="font-['Inter:Medium',sans-serif] font-medium text-[12px] leading-[14px] text-[#fe456a]">
            See all
          </button>
        </div>

        <div className="flex gap-[12px] overflow-x-auto pb-[8px]">
          {["Kibagabaga", "Kicukiro", "Gikondo", "Nyarutarama"].map((location, index) => (
            <button
              key={location}
              className={`flex items-center gap-[8px] px-[8px] py-[4px] rounded-[10px] flex-shrink-0 ${
                index === 1
                  ? "bg-[#fe456a]"
                  : "bg-[#f9f5ff] border border-[#d2d6db]"
              }`}
            >
              <div className="w-[36px] h-[36px] rounded-[8px] bg-[#d9d9d9]" />
              <p
                className={`font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] leading-[14px] ${
                  index === 1 ? "text-white" : "text-[#9da4ae]"
                }`}
              >
                {location}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Homes you might like */}
      <div className="px-6 py-4">
        <p className="font-['Inter:Medium',sans-serif] font-medium text-[12px] leading-[16px] text-[#9da4ae] mb-[16px]">
          Homes you might like
        </p>

        <div className="flex gap-[12px] overflow-x-auto pb-[8px] -mx-6 px-6">
          {recommendedHomes.map((home) => (
            <button
              key={home.id}
              onClick={onBrowseHomes}
              className="flex-none w-[160px] bg-[#fafafa] rounded-[12px] overflow-hidden hover:bg-[#f3f4f6] transition-colors"
            >
              <div className="relative">
                <img
                  src={home.image}
                  alt={home.title}
                  className="w-full h-[100px] object-cover"
                />
              </div>
              <div className="p-[12px]">
                {/* Listing type label */}
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[9px] leading-[12px] text-[#9da4ae] mb-[4px]">
                  {home.listingType}
                </p>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#1f2a37] mb-[4px] truncate">
                  {home.title}
                </p>
                <p className="font-['Inter:Bold',sans-serif] font-bold text-[14px] leading-[18px] text-[#fe456a] mb-[4px]">
                  {home.price}
                  <span className="font-['Inter:Regular',sans-serif] font-normal text-[10px] leading-[14px] text-[#9da4ae]">
                    /month
                  </span>
                </p>
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[10px] leading-[14px] text-[#9da4ae] mb-[4px]">
                  {home.location}
                </p>
                {/* Show roommates count for shared listings */}
                {home.roommates > 0 && (
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[9px] leading-[12px] text-[#6b7280]">
                    {home.roommates} roommates already living here
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CTA Cards */}
      <div className="px-6 py-4">
        <div className="flex gap-[12px]">
          {/* Start Matching */}
          <button
            onClick={onStartMatching}
            className="flex-1 bg-gradient-to-b from-[#fe456a] to-[#ff758f] rounded-[12px] p-[16px] flex flex-col items-start hover:shadow-md transition-all"
          >
            <div className="w-[40px] h-[40px] bg-white/20 rounded-[10px] flex items-center justify-center mb-[8px]">
              <Heart className="w-[20px] h-[20px] text-white" />
            </div>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] leading-[18px] text-white">
              Start Matching
            </p>
          </button>

          {/* Browse Homes */}
          <button
            onClick={onBrowseHomes}
            className="flex-1 bg-[#f3f4f6] rounded-[12px] p-[16px] flex flex-col items-start hover:bg-[#e5e7eb] transition-colors"
          >
            <div className="w-[40px] h-[40px] bg-white rounded-[10px] flex items-center justify-center mb-[8px]">
              <HomeIcon className="w-[20px] h-[20px] text-[#fe456a]" />
            </div>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] leading-[18px] text-[#1f2a37]">
              Browse Homes
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
