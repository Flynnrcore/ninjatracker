export const BASE_URL = import.meta.env.VITE_BASE_URL || '/';
export const withBaseUrl = (path: string) => `${BASE_URL}${path}`;

export const PATH = {
  ERROR_IMG: withBaseUrl('error-img.webp'),
  LOGO: withBaseUrl('logo.webp'),
  NOT_FOUND_IMG: withBaseUrl('404-img.webp'),
  MAIN_PAGE_LOGO: withBaseUrl('main-img.svg'),
  MAIN_PAGE_SHEDULE_IMG: withBaseUrl('shedule-ninja.webp'),
  INSTRUMENT: {
    EGUITAR: withBaseUrl('icons/eguitar.webp'),
    AGUITAR: withBaseUrl('icons/aguitar.webp'),
    BASS: withBaseUrl('icons/bass.webp'),
    PIANO: withBaseUrl('icons/piano.webp'),
    DRUMS: withBaseUrl('icons/drums.webp'),
    MICROPHONE: withBaseUrl('icons/microphone.webp'),
    OTHER: withBaseUrl('icons/other.webp'),
  },
  REMOVE_BTN_IMG: withBaseUrl('del-img.webp'),
  METRONOME_IMG: withBaseUrl('metronome-img.webp'),
  AUTH_IMG: withBaseUrl('auth.webp'),
};
