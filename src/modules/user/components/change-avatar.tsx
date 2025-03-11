import { useMutation } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import Dropzone from 'shadcn-dropzone';

import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils';
import { useUserStore } from '@/shared/store/user.store';

import { UserService } from '../user.service';

interface ChangeAvatarProps {
  className?: string;
}

export const ChangeAvatar: FC<ChangeAvatarProps> = ({ className }) => {
  const [open, setOpen] = useState(false);

  const { setAvatar, clearAvatar } = useUserStore();
  const [file, setFile] = useState<File | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: UserService.updateAvatar,
    onSuccess: () => {
      setOpen(false);
      setFile(null);
    }
  });

  const handleFileChange = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);

      setAvatar(URL.createObjectURL(files[0]));
    }
  };

  const onClose = () => {
    clearAvatar();
    setOpen(false);
    setFile(null);
  };

  const onConfirm = () => {
    const formData = new FormData();

    if (file) {
      formData.append('avatar', file);
    }

    mutate(formData);
  };

  return (
    <Dialog open={isPending || open} onOpenChange={onClose}>
      <Button className={cn('rounded-full', className)} size="icon" onClick={() => setOpen(true)}>
        <MdEdit />
      </Button>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Avatar</DialogTitle>
        </DialogHeader>

        <Dropzone
          dropZoneClassName="h-40"
          accept={{
            'image/*': []
          }}
          multiple={false}
          showFilesList={false}
          onDropAccepted={handleFileChange}
          disabled={isPending}>
          {() => (
            <>
              {file ? (
                <>
                  <img src={URL.createObjectURL(file)} alt="avatar" className="h-40 w-40 object-cover rounded-md" />
                </>
              ) : (
                <>Upload Avatar</>
              )}
            </>
          )}
        </Dropzone>

        <DialogFooter>
          <Button disabled={isPending} onClick={onConfirm} isLoading={isPending}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
