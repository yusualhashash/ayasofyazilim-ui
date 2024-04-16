import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const defaultProps: ISectionLayoutProps = {
  sectionData: [
    {
      name: 'About The Project',
      value:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel ultrices sapien. Maecenas lobortis elementum sapien, sed volutpat lacus. Vivamus vitae erat mi. Suspendisse vestibulum turpis libero. Donec facilisis quam in magna tempus, quis bibendum diam blandit. Nulla eget sem gravida, hendrerit tortor sed, laoreet tortor. Donec vitae nibh erat. Proin faucibus vulputate nunc, id feugiat justo volutpat quis. Aliquam erat volutpat.Aliquam faucibus, turpis in rhoncus tincidunt, quam nisi rutrum metus, ac gravida erat nulla suscipit elit. Donec vehicula dolor ut metus semper, et cursus dui eleifend. Duis vitae sem condimentum, placerat turpis eget, mollis quam. Morbi convallis sodales leo, a porta leo sagittis in. Curabitur dignissim vehicula faucibus. Nam fringilla velit a lectus accumsan laoreet. Donec sit amet porttitor nibh.Donec pretium placerat ipsum, eget tempor tellus. In pulvinar id lacus sit amet molestie. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum orci et erat volutpat facilisis. Cras fringilla elementum ipsum sed tristique. Donec elementum libero a purus laoreet, viverra rutrum dolor pellentesque. Duis varius et neque sit amet feugiat. Vivamus ac ante ligula. ',
    },
    {
      name: 'Documents',
      value:
        ' Phasellus suscipit mollis elit et aliquet. Curabitur elit velit, gravida non odio eu, elementum facilisis purus. Vestibulum accumsan risus eget neque blandit sodales. Praesent velit urna, faucibus id lacus non, gravida finibus sapien. Curabitur pretium orci vitae commodo convallis. Sed non lacus bibendum, gravida neque sit amet, scelerisque ante. Cras velit massa, venenatis eu tortor et, lacinia consequat elit.Praesent sit amet quam et dolor dapibus rhoncus. Ut vel purus nec velit gravida dapibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec viverra velit odio, vel efficitur lorem pharetra vel. Mauris lacinia libero risus, posuere vehicula dui venenatis eget. Quisque ut pulvinar ligula, id dignissim ipsum. Vivamus arcu erat, consectetur id laoreet sit amet, pharetra eget ligula. Morbi fringilla orci et ante molestie, quis fermentum turpis posuere. Nam hendrerit eleifend dolor ut tempor. Integer dictum faucibus elementum. Praesent tristique lorem a massa dignissim, vitae rutrum nunc porta. Integer elementum lacus ac porttitor posuere. Donec auctor in massa et gravida. Phasellus vitae vehicula nibh. Ut elit mauris, volutpat hendrerit ex at, maximus feugiat velit.Phasellus ultrices, lorem et malesuada lobortis, lacus erat iaculis nunc, eu ultricies eros urna vitae lorem. Pellentesque tristique malesuada lobortis. Nam eget consequat risus, sed viverra quam. Curabitur rutrum nibh nec magna eleifend, ut pellentesque tellus luctus. Donec porta eget felis ac faucibus. Fusce vel laoreet mi. Integer lacinia vehicula lorem. Sed nec efficitur dui. Quisque vehicula tincidunt tempus. Praesent elementum enim euismod ex gravida feugiat. Proin ullamcorper eu neque eu vulputate. Praesent hendrerit posuere eros, vitae porta est dictum condimentum.',
    },
    {
      name: 'Team',
      value:
        'Sed non lacus bibendum, gravida neque sit amet, scelerisque ante. Cras velit massa, venenatis eu tortor et, lacinia consequat elit.Praesent sit amet quam et dolor dapibus rhoncus. Ut vel purus nec velit gravida dapibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec viverra velit odio, vel efficitur lorem pharetra vel. Mauris lacinia libero risus, posuere vehicula dui venenatis eget. Quisque ut pulvinar ligula, id dignissim ipsum. Vivamus arcu erat, consectetur id laoreet sit amet, pharetra eget ligula. Morbi fringilla orci et ante molestie, quis fermentum turpis posuere. Nam hendrerit eleifend dolor ut tempor. Integer dictum faucibus elementum. Praesent tristique lorem a massa dignissim, vitae rutrum nunc porta. Integer elementum lacus ac porttitor posuere. Donec auctor in massa et gravida. Phasellus vitae vehicula nibh. Ut elit mauris, volutpat hendrerit ex at, maximus feugiat velit.Phasellus ultrices, lorem et malesuada lobortis, lacus erat iaculis nunc, eu ultricies eros urna vitae lorem. Pellentesque tristique malesuada lobortis. Nam eget consequat risus, sed viverra quam. Curabitur rutrum nibh nec magna eleifend, ut pellentesque tellus luctus. Donec porta eget felis ac faucibus. Fusce vel laoreet mi. Integer lacinia vehicula lorem. Sed nec efficitur dui. Quisque vehicula tincidunt tempus. Praesent elementum enim euismod ex gravida feugiat. Proin ullamcorper eu neque eu vulputate. Praesent hendrerit posuere eros, vitae porta est dictum condimentum.',
    },
  ],
};
function sectionNameToId(name: string) {
  const removeNonAlphaNumeric = (str: string) => str.replace(/[\W_]/g, '');
  return removeNonAlphaNumeric(name.toLocaleLowerCase().split(' ').join('-'));
}

interface ISection {
  name: string;
  value: string;
}
interface ISectionContent {
  sectionContent: string;
  sectionId: string;
  sectionName: string;
  setVisibleSection: React.Dispatch<React.SetStateAction<string>>;
}
export interface ISectionLayoutProps {
  sectionData: Array<ISection>;
}

const SectionContent = ({
  setVisibleSection,
  sectionId,
  sectionName,
  sectionContent,
}: ISectionContent) => {
  const divRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleSection(sectionId);
        }
      },
      { threshold: 0.5 }
    );
    if (divRef.current) {
      observer.observe(divRef.current);
    }
    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, []);

  return (
    <div id={sectionId} ref={divRef} className="h -[1000px]">
      <Card>
        <CardHeader>
          <CardTitle>{sectionName}</CardTitle>
          <CardDescription>
            Bölüm hakkında kısa bir açıklama yazısı.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{sectionContent}</p>
        </CardContent>
        {/* <CardFooter className="border-t px-6 py-4">
          <Button>Save</Button>
        </CardFooter> */}
      </Card>
    </div>
  );
};
export default function SectionLayout({ sectionData }: ISectionLayoutProps) {
  const [activeSectionId, setActiveSectionId] = useState<string>('');

  const sections = useMemo(
    () =>
      sectionData.map((section: ISection, index) => ({
        id: sectionNameToId(section.name + index),
        name: section.name,
        value: section.value,
      })),
    [sectionData]
  );

  return (
    <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
      <nav className="grid gap-4 text-sm text-muted-foreground sticky top-0">
        {sections.map((item) => (
          <a
            href={`#${item.id}`}
            key={item.id}
            className={
              activeSectionId === item.id ? 'font-semibold text-primary' : ''
            }
          >
            {item.name}
          </a>
        ))}
      </nav>
      <div className="grid gap-6">
        {sections.map((item) => (
          <SectionContent
            key={item.id}
            setVisibleSection={setActiveSectionId}
            sectionId={item.id}
            sectionName={item.name}
            sectionContent={item.value}
          />
        ))}
      </div>
    </div>
  );
}
