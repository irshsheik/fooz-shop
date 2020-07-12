import { Injectable } from '@angular/core';

import {
  IconDefinition,
  faAtom,
  faBolt,
  faShoppingBag,
  faPhoneAlt,
  faSearch,
  faUserCircle,
  faCircleNotch,
  faBookmark,
  faHeart,
  faStar,
  faArrowCircleDown,
  faArrowAltCircleDown,
  faBoxOpen,
  faMapMarkerAlt,
  faFilter,
  faSort,
  faLevelDownAlt,
  faTape,
  faLayerGroup,
  faShoppingCart,
  faDotCircle,
  faTeethOpen,
  faDoorOpen,
  faLongArrowAltUp,
  faLongArrowAltDown,
  faArrowsAltH,
  faArrowsAltV,
  faStop,
  faStopCircle,
  faChevronRight,
  faCheck,
  faHandPointDown,
  faTimesCircle,
  faTimes,
  faCircle,
  faPlus,
  faMinus,
  faBars,
  faExclamationCircle,
  faWindowMaximize,
  faStore,
  faInfoCircle,
  faHeadset,
  faTruck,
  faSpinner,
  faLongArrowAltRight,
  faTruckLoading,
  faAddressBook,
  faCartPlus,
  faThumbsUp,
  faUserLock,
  faSignOutAlt,
  faEnvelope,
  faEnvelopeOpenText,
  faUnlockAlt,
  faUser as fasUser,
  faChevronLeft,
  faCheckCircle,
  faShippingFast,
  faShieldAlt,
  faPencilAlt
} from '@fortawesome/free-solid-svg-icons';
import { 
  faUser as farUser,
  faCircle as farCircle,
 } from '@fortawesome/free-regular-svg-icons';
import { faGoogle, faCcVisa, faCcAmex, faCcMastercard, faCcPaypal } from '@fortawesome/free-brands-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  icons: IconDefinition[] = [];

  constructor() {
    this.icons = [
      faAtom,
      faBolt,
      faShoppingBag,
      faPhoneAlt,
      faSearch,
      faUserCircle,
      faCircleNotch,
      faBookmark,
      faHeart,
      faStar,
      faArrowCircleDown,
      faArrowAltCircleDown,
      faBoxOpen,
      faMapMarkerAlt,
      faFilter,
      faSort,
      faLevelDownAlt,
      faTape,
      faLayerGroup,
      faShoppingCart,
      faDotCircle,
      faTeethOpen,
      faDoorOpen,
      faLongArrowAltUp,
      faLongArrowAltDown,
      faLongArrowAltRight,
      faArrowsAltH,
      faArrowsAltV,
      faLayerGroup,
      faStop,
      faStopCircle,
      faChevronRight,
      faChevronLeft,
      faCircleNotch,
      faCheck,
      faHandPointDown,
      faTimesCircle,
      faTimes,
      faCircle,
      faPlus,
      faMinus,
      faBars,
      faExclamationCircle,
      faGoogle,
      faWindowMaximize,
      faStore,
      faInfoCircle,
      faHeadset,
      faTruck,
      faSpinner,
      faLongArrowAltRight,
      faTruckLoading,
      faAddressBook,
      faCartPlus,
      faThumbsUp,
      faUserLock,
      faSignOutAlt,
      faEnvelopeOpenText,
      faUnlockAlt,
      fasUser,
      farUser,
      faCheckCircle,
      faShippingFast,
      faCcVisa,
      faCcAmex,
      faCcMastercard,
      faCcPaypal,
      faShieldAlt,
      faPencilAlt,
      farCircle
    ];
  }

  getImportedIcons(): IconDefinition[] {
    return this.icons;
  }
}
