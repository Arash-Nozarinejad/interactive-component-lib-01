import React from 'react';
import { Modal, ModalBody, ModalFooter } from './atoms/Modal/Modal';

function ModalComponentExamples() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">Modal Examples</h1>

      {/* Basic Modal Example */}
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-md bg-blue-500 px-4 py-2 text-white"
      >
        Open Basic Modal
      </button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Example Modal"
        description="This is a simple modal example."
      >
        <ModalBody>
          <p>Modal content goes here.</p>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-md bg-gray-100 px-4 py-2"
          >
            Cancel
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-md bg-blue-500 px-4 py-2 text-white"
          >
            Confirm
          </button>
        </ModalFooter>
      </Modal>

      {/* Form Modal Example */}
      <button
        onClick={() => setIsFormOpen(true)}
        className="rounded-md bg-green-500 px-4 py-2 text-white"
      >
        Open Form Modal
      </button>
      <Modal
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Edit Profile"
        size="lg"
      >
        <ModalBody>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => setIsFormOpen(false)}
            className="rounded-md bg-gray-100 px-4 py-2"
          >
            Cancel
          </button>
          <button
            onClick={() => setIsFormOpen(false)}
            className="rounded-md bg-green-500 px-4 py-2 text-white"
          >
            Save Changes
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalComponentExamples;
