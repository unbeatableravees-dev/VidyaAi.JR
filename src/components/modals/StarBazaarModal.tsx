import React, { useState, useEffect } from 'react';
import { X, Sparkles, Star, Check, Lock, Palette, ShoppingBag } from 'lucide-react';
import { sound } from '../../utils/audio';
import { getStudentProgress } from '../../utils/studentProgress';
import {
  STORE_CHARACTERS,
  STORE_ACCESSORIES,
  STORE_THEMES,
  StoreCategory,
  StoreItem,
  getStudentStoreData,
  buyStoreItem,
  equipStoreItem,
} from '../../utils/starStore';

interface StarBazaarModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId: string | null | undefined;
  studentName: string;
}

export const StarBazaarModal: React.FC<StarBazaarModalProps> = ({
  isOpen,
  onClose,
  studentId,
  studentName,
}) => {
  const [activeTab, setActiveTab] = useState<StoreCategory>('character');
  const [storeData, setStoreData] = useState(() => getStudentStoreData(studentId));
  const [stars, setStars] = useState(() => getStudentProgress(studentId).starsEarned);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const reload = () => {
      setStoreData(getStudentStoreData(studentId));
      setStars(getStudentProgress(studentId).starsEarned);
    };
    reload();
    window.addEventListener('studentprogresschange', reload);
    window.addEventListener('studentstorechange', reload);
    return () => {
      window.removeEventListener('studentprogresschange', reload);
      window.removeEventListener('studentstorechange', reload);
    };
  }, [isOpen, studentId]);

  if (!isOpen) return null;

  const handleBuy = (item: StoreItem) => {
    sound.playPop();
    const result = buyStoreItem(studentId, item.id);
    setStatusMessage(result.message);
    if (result.success) {
      sound.playFanfare();
      // Auto-equip on purchase
      equipStoreItem(studentId, item.id, item.category);
    }
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleToggleEquip = (item: StoreItem) => {
    sound.playPop();
    const isEquipped =
      (item.category === 'character' && storeData.equippedCharacterId === item.id) ||
      (item.category === 'accessory' && storeData.equippedAccessoryId === item.id) ||
      (item.category === 'theme' && storeData.equippedThemeId === item.id);

    if (isEquipped) {
      // Unequip
      equipStoreItem(studentId, null, item.category);
    } else {
      equipStoreItem(studentId, item.id, item.category);
    }
  };

  const currentItems =
    activeTab === 'character'
      ? STORE_CHARACTERS
      : activeTab === 'accessory'
      ? STORE_ACCESSORIES
      : STORE_THEMES;

  // Active Equipped Preview
  const activeChar = STORE_CHARACTERS.find((c) => c.id === storeData.equippedCharacterId);
  const activeAcc = STORE_ACCESSORIES.find((a) => a.id === storeData.equippedAccessoryId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border-4 border-yellow-300 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header Banner */}
        <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-5 sm:p-6 text-white flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner border border-white/30">
              🛍️
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
                Star Bazaar & Closet
                <Sparkles className="w-5 h-5 text-yellow-200 animate-spin" style={{ animationDuration: '6s' }} />
              </h2>
              <p className="text-xs sm:text-sm font-bold text-amber-100">
                Unlock cool characters, hero costumes, and magical themes!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Stars Pill */}
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-950/30 backdrop-blur-md rounded-2xl border border-yellow-300/40 shadow-inner">
              <Star className="w-6 h-6 text-yellow-300 fill-yellow-400 animate-bounce" />
              <div className="text-left">
                <p className="text-[10px] font-black uppercase text-amber-200 tracking-wider">Your Stars</p>
                <p className="text-lg font-black text-white">{stars} ⭐</p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playPop();
                onClose();
              }}
              className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Live Costume Preview Bar */}
        <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border-b-2 border-amber-200 p-4 px-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl shadow-lg border-2 border-white">
              {activeChar ? activeChar.emoji : '👦'}
              {activeAcc && (
                <span className="absolute -top-3 -right-2 text-2xl drop-shadow-md animate-bounce">
                  {activeAcc.emoji}
                </span>
              )}
            </div>
            <div>
              <p className="text-xs font-black uppercase text-amber-800 tracking-wide">
                Current Hero Look: <span className="text-slate-900 font-extrabold">{studentName}</span>
              </p>
              <p className="text-sm font-black text-slate-800">
                {activeChar ? activeChar.name : 'Classic Junior'}
                {activeAcc ? ` + ${activeAcc.name}` : ''}
              </p>
            </div>
          </div>

          {statusMessage && (
            <div className="px-4 py-1.5 rounded-full bg-emerald-500 text-white font-black text-xs shadow-md animate-bounce">
              {statusMessage}
            </div>
          )}
        </div>

        {/* Categories Tab Bar */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-2 pt-3">
          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('character');
            }}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl font-black text-xs sm:text-sm border-t-2 border-x-2 transition cursor-pointer ${
              activeTab === 'character'
                ? 'bg-white border-amber-400 text-amber-700 shadow-sm'
                : 'bg-slate-100 border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            🦸 Hero Characters ({STORE_CHARACTERS.length})
          </button>
          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('accessory');
            }}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl font-black text-xs sm:text-sm border-t-2 border-x-2 transition cursor-pointer ${
              activeTab === 'accessory'
                ? 'bg-white border-amber-400 text-amber-700 shadow-sm'
                : 'bg-slate-100 border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            👑 Accessories & Pets ({STORE_ACCESSORIES.length})
          </button>
          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('theme');
            }}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl font-black text-xs sm:text-sm border-t-2 border-x-2 transition cursor-pointer ${
              activeTab === 'theme'
                ? 'bg-white border-amber-400 text-amber-700 shadow-sm'
                : 'bg-slate-100 border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            🎨 Magical Themes ({STORE_THEMES.length})
          </button>
        </div>

        {/* Items Grid */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-slate-50/50">
          {currentItems.map((item) => {
            const isUnlocked = storeData.unlockedItemIds.includes(item.id) || item.cost === 0;
            const isEquipped =
              (item.category === 'character' && storeData.equippedCharacterId === item.id) ||
              (item.category === 'accessory' && storeData.equippedAccessoryId === item.id) ||
              (item.category === 'theme' && storeData.equippedThemeId === item.id);
            const canAfford = stars >= item.cost;

            return (
              <div
                key={item.id}
                className={`relative rounded-3xl p-5 border-2 transition-all flex flex-col justify-between ${
                  isEquipped
                    ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-400 shadow-lg ring-2 ring-amber-400'
                    : isUnlocked
                    ? 'bg-white border-emerald-300 hover:border-emerald-400 shadow-sm'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                {/* Item Top Badge */}
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-3xl shadow-md border-2 border-white`}
                  >
                    {item.emoji}
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white shadow-sm">
                        {item.badge}
                      </span>
                    )}
                    {isEquipped && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-amber-500 text-white shadow-sm flex items-center gap-1">
                        <Check className="w-3 h-3" /> Equipped
                      </span>
                    )}
                    {!isUnlocked && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {item.cost}
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="mb-4">
                  <h4 className="text-base font-black text-slate-800">{item.name}</h4>
                  <p className="text-xs font-bold text-slate-500 mt-1 leading-relaxed">
                    {item.tagline}
                  </p>
                </div>

                {/* Action Buttons */}
                <div>
                  {isUnlocked ? (
                    <button
                      onClick={() => handleToggleEquip(item)}
                      className={`w-full py-2.5 px-4 rounded-xl font-black text-xs sm:text-sm transition cursor-pointer flex items-center justify-center gap-2 ${
                        isEquipped
                          ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                      }`}
                    >
                      {isEquipped ? (
                        <>
                          <Check className="w-4 h-4" /> In Use (Tap to Remove)
                        </>
                      ) : (
                        'Equip to Avatar'
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBuy(item)}
                      disabled={!canAfford}
                      className={`w-full py-2.5 px-4 rounded-xl font-black text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer ${
                        canAfford
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                      }`}
                    >
                      {canAfford ? (
                        <>
                          <Sparkles className="w-4 h-4 text-yellow-200" /> Unlock for {item.cost} ⭐
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" /> Need {item.cost - stars} more ⭐
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
