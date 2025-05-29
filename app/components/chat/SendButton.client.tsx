import { AnimatePresence, cubicBezier, motion } from 'framer-motion';

interface SendButtonProps {
  show: boolean;
  isStreaming?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onImagesSelected?: (images: File[]) => void;
}

const customEasingFn = cubicBezier(0.4, 0, 0.2, 1);

export const SendButton = ({ show, isStreaming, disabled, onClick }: SendButtonProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          className="absolute flex justify-center items-center top-[18px] right-[22px] p-1 bg-red-500 text-white rounded-xl w-[40px] h-[40px] shadow-lg hover:shadow-xl transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ ease: customEasingFn, duration: 0.25 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          disabled={disabled}
          onClick={(event) => {
            event.preventDefault();
            if (!disabled) {
              onClick?.(event);
            }
          }}
        >
          <motion.div
            key={isStreaming ? 'stop' : 'send'}
            initial={{ opacity: 0, rotate: -20 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 20 }}
            transition={{ duration: 0.2, ease: customEasingFn }}
            className="text-[18px] flex items-center justify-center"
          >
            {!isStreaming ? (
              <div className="i-ph:arrow-right-bold"></div>
            ) : (
              <div className="i-ph:stop-circle-bold"></div>
            )}
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
