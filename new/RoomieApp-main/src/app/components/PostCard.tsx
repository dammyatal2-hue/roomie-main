import { Heart, MessageCircle, Bookmark, MapPin } from "lucide-react";
import { useState } from "react";

interface PostCardProps {
  id: string;
  userName: string;
  userAvatar: string;
  location: string;
  timestamp: string;
  text: string;
  tags?: string[];
  matchScore?: "high" | "medium" | null;
}

export function PostCard({
  userName,
  userAvatar,
  location,
  timestamp,
  text,
  tags = [],
  matchScore = null,
}: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const getMatchBadge = () => {
    if (matchScore === "high") {
      return {
        text: "High Match 🔥",
        bgColor: "bg-[#fef3f2]",
        textColor: "text-[#fe456a]",
        borderColor: "border-[#fecdd3]",
      };
    }
    if (matchScore === "medium") {
      return {
        text: "Good Match ✨",
        bgColor: "bg-[#fffaeb]",
        textColor: "text-[#f59e0b]",
        borderColor: "border-[#fde68a]",
      };
    }
    return null;
  };

  const matchBadge = getMatchBadge();

  return (
    <div className="bg-white rounded-[12px] p-4 border border-[#e5e7eb] shadow-sm relative">
      {/* Match Badge */}
      {matchBadge && (
        <div
          className={`absolute top-3 right-3 ${matchBadge.bgColor} ${matchBadge.textColor} px-[10px] py-[4px] rounded-[16px] border ${matchBadge.borderColor} font-['Inter:Semi_Bold',sans-serif] font-semibold text-[10px] leading-[14px]`}
        >
          {matchBadge.text}
        </div>
      )}

      {/* User Info */}
      <div className="flex items-start gap-3 mb-3">
        <img
          src={userAvatar}
          alt={userName}
          className="w-[44px] h-[44px] rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#1f2a37] leading-[18px]">
            {userName}
          </p>
          <div className="flex items-center gap-1 mt-0.5">
            <MapPin className="w-[12px] h-[12px] text-[#9da4ae]" />
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[10px] text-[#9da4ae] leading-[14px]">
              {location}
            </p>
          </div>
        </div>
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[10px] text-[#9da4ae] leading-[14px]">
          {timestamp}
        </p>
      </div>

      {/* Post Text */}
      <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#1f2a37] leading-[20px] mb-3">
        {text}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-[#fef3f2] px-[10px] py-[4px] rounded-[16px] font-['Inter:Medium',sans-serif] font-medium text-[10px] text-[#fe456a] leading-[14px]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Interaction Buttons */}
      <div className="flex items-center gap-4 pt-3 border-t border-[#e5e7eb]">
        <button
          onClick={() => setLiked(!liked)}
          className="flex items-center gap-1.5 transition-colors"
        >
          <Heart
            className={`w-[18px] h-[18px] transition-colors ${
              liked ? "fill-[#fe456a] text-[#fe456a]" : "text-[#9da4ae]"
            }`}
          />
          <span className="font-['Inter:Medium',sans-serif] font-medium text-[12px] text-[#9da4ae] leading-[14px]">
            Like
          </span>
        </button>
        <button className="flex items-center gap-1.5">
          <MessageCircle className="w-[18px] h-[18px] text-[#9da4ae]" />
          <span className="font-['Inter:Medium',sans-serif] font-medium text-[12px] text-[#9da4ae] leading-[14px]">
            Comment
          </span>
        </button>
        <button
          onClick={() => setSaved(!saved)}
          className="flex items-center gap-1.5 ml-auto transition-colors"
        >
          <Bookmark
            className={`w-[18px] h-[18px] transition-colors ${
              saved ? "fill-[#fe456a] text-[#fe456a]" : "text-[#9da4ae]"
            }`}
          />
          <span className="font-['Inter:Medium',sans-serif] font-medium text-[12px] text-[#9da4ae] leading-[14px]">
            Save
          </span>
        </button>
      </div>
    </div>
  );
}