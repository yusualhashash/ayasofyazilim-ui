'use client';

import * as React from 'react';
import Image from 'next/image';
import { Cross2Icon, FileTextIcon, UploadIcon } from '@radix-ui/react-icons';
import Dropzone, {
  type DropzoneProps,
  type FileRejection,
} from 'react-dropzone';
import { toast } from 'sonner';

import { replacePlaceholders } from 'src/lib/replace-placeholders';
import { cn, formatBytes } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useControllableState } from './hooks/use-controllable-state';

export * from './empty-card';

type FileUploaderResources = {
  CannotUploadMoreThanOne: string;
  'CannotUploadMoreThan{0}': string;
  DragAndDropFilesHere: string;
  DropTheFilesHere: string;
  'FailedToUpload{0}': string;
  File: string;
  Files: string;
  'RejectedFile{0}': string;
  RemoveFile: string;
  'Uploading{0}': string;
  'YouCanUpload{0}files{1}each': string;
  '{0}Uploaded': string;
};

interface FileUploaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Accepted file types for the uploader.
   * @type { [key: string]: string[]}
   * @default
   * ```ts
   * { "image/*": [] }
   * ```
   * @example accept={["image/png", "image/jpeg"]}
   */
  accept?: DropzoneProps['accept'];

  /**
   * Whether the uploader is disabled.
   * @type boolean
   * @default false
   * @example disabled
   */
  disabled?: boolean;

  /**
   * Maximum number of files for the uploader.
   * @type number | undefined
   * @default 1
   * @example maxFileCount={4}
   */
  maxFileCount?: DropzoneProps['maxFiles'];

  /**
   * Maximum file size for the uploader.
   * @type number | undefined
   * @default 1024 * 1024 * 2 // 2MB
   * @example maxSize={1024 * 1024 * 2} // 2MB
   */
  maxSize?: DropzoneProps['maxSize'];

  /**
   * Whether the uploader should accept multiple files.
   * @type boolean
   * @default false
   * @example multiple
   */
  multiple?: boolean;

  /**
   * Function to be called when files are uploaded.
   * @type (files: File[]) => Promise<void>
   * @default undefined
   * @example onUpload={(files) => uploadFiles(files)}
   */
  onUpload?: (files: File[]) => Promise<void>;

  /**
   * Function to be called when the value changes.
   * @type (files: File[]) => void
   * @default undefined
   * @example onValueChange={(files) => setFiles(files)}
   */
  onValueChange?: (files: File[]) => void;

  /**
   * Progress of the uploaded files.
   * @type Record<string, number> | undefined
   * @default undefined
   * @example progresses={{ "file1.png": 50 }}
   */
  progresses?: Record<string, number>;

  resources?: FileUploaderResources;

  /**
   * Value of the uploader.
   * @type File[]
   * @default undefined
   * @example value={files}
   */
  value?: File[];
}
const DefaultResources: FileUploaderResources = {
  CannotUploadMoreThanOne: 'Cannot upload more than 1 file at a time',
  'CannotUploadMoreThan{0}': 'Cannot upload more than {0} files',
  'RejectedFile{0}': 'File {0} was rejected',
  Files: 'files',
  File: 'file',
  'Uploading{0}': 'Uploading {0}...',
  '{0}Uploaded': '{0} uploaded',
  'FailedToUpload{0}': 'Failed to upload {0}',
  DropTheFilesHere: 'Drop the files here',
  DragAndDropFilesHere: "Drag'n drop files here, or click to select files",
  'YouCanUpload{0}files{1}each': 'You can upload {0} files (up to {1} each)',
  RemoveFile: 'Remove file',
};

export function FileUploader(props: FileUploaderProps) {
  const {
    value: valueProp,
    onValueChange,
    onUpload,
    progresses,
    accept = {
      'image/*': [],
    },
    maxSize = 1024 * 1024 * 2,
    maxFileCount = 1,
    multiple = false,
    disabled = false,
    resources = DefaultResources,
    className,
    ...dropzoneProps
  } = props;

  const [files, setFiles] = useControllableState({
    prop: valueProp,
    onChange: onValueChange,
  });

  const onDrop = React.useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (!multiple && maxFileCount === 1 && acceptedFiles.length > 1) {
        toast.error(resources.CannotUploadMoreThanOne);
        return;
      }

      if ((files?.length ?? 0) + acceptedFiles.length > maxFileCount) {
        toast.error(
          replacePlaceholders(resources['CannotUploadMoreThan{0}'], [
            {
              holder: '{0}',
              replacement: maxFileCount.toString(),
            },
          ])
        );
        return;
      }

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      const updatedFiles = files ? [...files, ...newFiles] : newFiles;

      setFiles(updatedFiles);

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ file }) => {
          toast.error(
            replacePlaceholders(resources['RejectedFile{0}'], [
              { holder: '{0}', replacement: file.name },
            ])
          );
        });
      }

      if (
        onUpload &&
        updatedFiles.length > 0 &&
        updatedFiles.length <= maxFileCount
      ) {
        const target =
          updatedFiles.length > 0
            ? `${updatedFiles.length} ${resources.Files}`
            : resources.File;

        toast.promise(onUpload(updatedFiles), {
          loading: replacePlaceholders(resources['Uploading{0}'], [
            { holder: '{0}', replacement: target },
          ]),
          success: () => {
            setFiles([]);
            return replacePlaceholders(resources['{0}Uploaded'], [
              { holder: '{0}', replacement: target },
            ]);
          },
          error: replacePlaceholders(resources['FailedToUpload{0}'], [
            { holder: '{0}', replacement: target },
          ]),
        });
      }
    },

    [files, maxFileCount, multiple, onUpload, setFiles]
  );

  function onRemove(index: number) {
    if (!files) return;
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onValueChange?.(newFiles);
  }

  // Revoke preview url when component unmounts
  React.useEffect(
    () => () => {
      if (!files) return;
      files.forEach((file) => {
        if (isFileWithPreview(file)) {
          URL.revokeObjectURL(file.preview);
        }
      });
    },
    []
  );

  const isDisabled = disabled || (files?.length ?? 0) >= maxFileCount;

  return (
    <div className="relative flex flex-col gap-6 overflow-hidden">
      <Dropzone
        onDrop={onDrop}
        accept={accept}
        maxSize={maxSize}
        maxFiles={maxFileCount}
        multiple={maxFileCount > 1 || multiple}
        disabled={isDisabled}
      >
        {({
          getRootProps,
          getInputProps,
          isDragActive,
        }: {
          getInputProps: any;
          getRootProps: any;
          isDragActive: boolean;
        }) => (
          <div
            {...getRootProps()}
            className={cn(
              'group relative grid h-52 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25',
              'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              isDragActive && 'border-muted-foreground/50',
              isDisabled && 'pointer-events-none opacity-60',
              className
            )}
            {...dropzoneProps}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                <div className="rounded-full border border-dashed p-3">
                  <UploadIcon
                    className="size-7 text-muted-foreground"
                    aria-hidden="true"
                  />
                </div>
                <p className="font-medium text-muted-foreground">
                  {resources.DropTheFilesHere}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                <div className="rounded-full border border-dashed p-3">
                  <UploadIcon
                    className="size-7 text-muted-foreground"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex flex-col gap-px">
                  <p className="font-medium text-muted-foreground">
                    {resources.DragAndDropFilesHere}
                  </p>
                  <p className="text-sm text-muted-foreground/70">
                    {replacePlaceholders(
                      resources['YouCanUpload{0}files{1}each'],
                      [
                        {
                          holder: '{0}',
                          replacement:
                            maxFileCount === Infinity
                              ? 'multiple'
                              : maxFileCount,
                        },
                        {
                          holder: '{1}',
                          replacement: formatBytes(maxSize),
                        },
                      ]
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </Dropzone>
      {files?.length ? (
        <ScrollArea className="h-fit w-full px-3">
          <div className="flex max-h-48 flex-col gap-4">
            {files?.map((file, index) => (
              <FileCard
                resources={resources}
                key={file.name + file.size + file.lastModified}
                file={file}
                onRemove={() => onRemove(index)}
                progress={progresses?.[file.name]}
              />
            ))}
          </div>
        </ScrollArea>
      ) : null}
    </div>
  );
}

interface FileCardProps {
  file: File;
  onRemove: () => void;
  progress?: number;
  resources: Pick<FileUploaderResources, 'RemoveFile'>;
}

const FileCard = ({ file, progress, onRemove, resources }: FileCardProps) => (
  <div className="relative flex items-center gap-2.5">
    <div className="flex flex-1 gap-2.5">
      {isFileWithPreview(file) ? <FilePreview file={file} /> : null}
      <div className="flex w-full flex-col gap-2">
        <div className="flex flex-col gap-px">
          <p className="line-clamp-1 text-sm font-medium text-foreground/80">
            {file.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatBytes(file.size)}
          </p>
        </div>
        {progress ? <Progress value={progress} /> : null}
      </div>
    </div>
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="size-7"
        onClick={onRemove}
      >
        <Cross2Icon className="size-4" aria-hidden="true" />
        <span className="sr-only">{resources.RemoveFile}</span>
      </Button>
    </div>
  </div>
);

const isFileWithPreview = (file: File): file is File & { preview: string } =>
  'preview' in file && typeof file.preview === 'string';

interface FilePreviewProps {
  file: File & { preview: string };
}

function FilePreview({ file }: FilePreviewProps) {
  if (file.type.startsWith('image/')) {
    return (
      <Image
        src={file.preview}
        alt={file.name}
        width={48}
        height={48}
        loading="lazy"
        className="aspect-square shrink-0 rounded-md object-cover"
      />
    );
  }

  return (
    <FileTextIcon
      className="size-10 text-muted-foreground"
      aria-hidden="true"
    />
  );
}
