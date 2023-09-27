import React from 'react';

// ** import from nextUi
import { CircularProgress, Modal, ModalContent } from '@nextui-org/react';

/**
 * @typedef {'opaque' | 'blur' | 'transparent'} BackdropVariant
 * @typedef {'auto' | 'top' | 'center' | 'bottom' | 'bottom-center' | 'top-center'} placement
 */

/**
 * Loader component.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isLoading - A boolean indicating whether the loader is loading
 * @param {BackdropVariant} props.backdropVariant - The variant of the backdrop to render.
 * @param {placement} props.placement - The placement of the loader
 * @returns {JSX.Element} The rendered Loader component.
 */

const Loader = ({
  isLoading = false,
  backdropVariant = 'opaque', // default backdrop is opaque
  placement = 'center', // default placement is center
}) => {
  return (
    <Modal
      backdrop={backdropVariant}
      isOpen={isLoading}
      hideCloseButton={true}
      placement={placement}
    >
      <ModalContent className="p-6 text-center max-w-fit bg-transparent shadow-none">
        <div className="mx-auto mb-4">
          <CircularProgress className="mx-auto" size="lg" classNames={{svg:"text-primary-600"}}/>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default Loader;
