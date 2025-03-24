import { Download, File, FileImage, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export type FileTypeForFileCard = {
  fileId?: string | null;
  fullPath?: string | null;
  fileDescription?: string | null;
  fileName: string;
  fileType: string;
  onDownloadClick?: () => void;
};
export type TabConfig = {
  value: string;
  label: string;
  files: FileTypeForFileCard[];
};

const getFileIcon = (type: string) => {
  switch (type) {
    case 'pdf':
      return <FileText />;
    case 'image':
      return <FileImage />;
    default:
      return <File />;
  }
};

function FileList({ files }: { files: FileTypeForFileCard[] }) {
  return (
    <div className="space-y-4">
      {files.map((file) => (
        <div
          className="hover:bg-muted/50 group flex items-center gap-3 rounded-lg border p-3 transition-all bg-white"
          key={file.fileId}
        >
          <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-md">
            {getFileIcon(file.fileType)}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">
                {file.fileDescription || 'Açıklama yok'}
              </h4>
              <Button
                className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                size="icon"
                variant="ghost"
                onClick={() => {
                  if (file.onDownloadClick) file.onDownloadClick();
                }}
              >
                <Download />
                <span className="sr-only">İndir</span>
              </Button>
            </div>
            <p className="text-muted-foreground line-clamp-2 text-sm">
              {file.fileName}
            </p>
            <div className="mt-1 flex items-center gap-2">
              <span className="bg-muted-foreground inline-flex h-1.5 w-1.5 rounded-full" />
              <span className="text-muted-foreground text-xs uppercase">
                {file.fileType}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function DocumentCard({
  documentTabs,
  activeDefaultTab,
}: {
  documentTabs: TabConfig[];
  activeDefaultTab: string;
}) {
  return (
    <Tabs className="w-full" defaultValue={activeDefaultTab}>
      <TabsList className="mb-12 grid w-full grid-cols-1 gap-2 md:mb-4 md:flex md:flex-row">
        {documentTabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            className="w-full md:flex-1"
            value={tab.value}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {documentTabs.map((tab) => (
        <TabsContent key={tab.value} className="h-[350px]" value={tab.value}>
          <ScrollArea className="h-full w-full">
            <div className="pr-4">
              <FileList files={tab.files} />
            </div>
          </ScrollArea>
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default DocumentCard;
