'use client';

import React, { useEffect, useState, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import Portal from './Portal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Center the modal when it opens
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const modalWidth = modalRef.current.offsetWidth;
      const modalHeight = modalRef.current.offsetHeight;
      
      setPosition({
        x: (viewportWidth - modalWidth) / 2,
        y: Math.max(20, (viewportHeight - modalHeight) / 2) // Ensure some top margin
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.classList.contains('modal-header')) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      // Add bounds checking to keep modal within viewport
      const modalRect = modalRef.current?.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      if (modalRect) {
        const maxX = viewportWidth - modalRect.width;
        const maxY = viewportHeight - modalRect.height;
        
        setPosition({
          x: Math.min(Math.max(0, newX), maxX),
          y: Math.min(Math.max(0, newY), maxY)
        });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove as any);
      return () => {
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('mousemove', handleMouseMove as any);
      };
    }
  }, [isDragging]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="modal-wrapper" style={{ position: 'fixed', inset: 0, zIndex: 99999, pointerEvents: 'none' }}>
      {/* Semi-transparent overlay */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-[2px]"
        onClick={onClose}
        style={{ pointerEvents: 'auto' }}
      />
      
      {/* Modal */}
      <div
        ref={modalRef}
        className={`fixed bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl w-full max-w-4xl ${
          isDragging ? 'cursor-grabbing' : ''
        }`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          maxHeight: '90vh',
          transition: isDragging ? 'none' : 'transform 0.2s ease-out',
          pointerEvents: 'auto'
        }}
      >
        <div 
          className="modal-header flex items-center justify-between p-4 border-b border-gray-700 cursor-grab active:cursor-grabbing bg-gray-800/50 rounded-t-xl select-none"
          onMouseDown={handleMouseDown}
        >
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-700 rounded-lg"
          >
            <FaTimes size={20} />
          </button>
        </div>
        <div className="p-4 overflow-y-auto custom-scrollbar" style={{ maxHeight: 'calc(90vh - 4rem)' }}>
          {children}
        </div>
      </div>
    </div>
  );

  return <Portal>{modalContent}</Portal>;
};

export default Modal; 