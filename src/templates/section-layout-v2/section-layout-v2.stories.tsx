import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';
import { SectionLayout, SectionLayoutContent, SectionLayoutNavbar } from '.';
import { Card } from '@/components/ui/card';

/**
 * Section Layout component with a navigation bar and content area.
 */
const meta: Meta<typeof SectionLayout> = {
  component: SectionLayout,
};

export default meta;
type Story = StoryObj<typeof SectionLayout>;

export const SamePageStory: Story = {
  parameters: {
    layout: 'centered',
  },
  render: () => (
    <div className="w-full">
      <article>
        <SectionLayout
          defaultActiveSectionId="section1"
          sections={[
            { id: 'section1', name: 'Yatırımcı Profillerim' },
            { id: 'section2', name: 'Yatırımcılarım' },
          ]}
        >
          <SectionLayoutContent
            sectionId="section1"
            className="text-sm w-[600px]"
          >
            Yatırımcı Profillerim sekmesinin içeriği
          </SectionLayoutContent>
          <SectionLayoutContent
            sectionId="section2"
            className="text-5xl w-[600px]"
          >
            Yatırımlarım sekmesinin içeriği
          </SectionLayoutContent>
        </SectionLayout>
      </article>
    </div>
  ),
};
export const NewPageStory: Story = {
  parameters: {
    layout: 'centered',
  },
  render: () => (
    <div className="w-full">
      <article>
        <SectionLayout
          defaultActiveSectionId="section1"
          sections={[
            { id: 'section1', name: 'Yatırımcı Profillerim', link: 'profile' },
            { id: 'section2', name: 'Yatırımcılarım', link: 'investment' },
          ]}
          linkElement="a"
        >
          <SectionLayoutContent
            sectionId="section1"
            className="text-sm w-[600px]"
          >
            Yatırımcı Profillerim sekmesinin içeriği
          </SectionLayoutContent>
        </SectionLayout>
      </article>
    </div>
  ),
};
export const VerticalStory: Story = {
  parameters: {
    layout: 'centered',
  },
  render: () => (
    <div className="w-full">
      <article>
        <SectionLayout
          vertical
          defaultActiveSectionId="section1"
          sections={[
            { id: 'section1', name: 'Yatırımcı Profillerim' },
            { id: 'section2', name: 'Yatırımcılarım' },
          ]}
        >
          <SectionLayoutContent
            sectionId="section1"
            className="text-sm w-[600px]"
          >
            Mauris vel ornare nunc. Sed varius, neque vel vehicula pharetra,
            risus enim imperdiet quam, in ultrices lectus dui pulvinar ipsum.
            Quisque ut mi at eros fringilla posuere. Ut condimentum eros at urna
            pulvinar maximus. Nulla facilisi. Ut vulputate id nisi a pharetra.
            Etiam vitae urna purus. Pellentesque non viverra justo, vitae mollis
            est. Phasellus in massa viverra, ultrices lacus tincidunt, congue
            ipsum. Curabitur ac eros in mauris laoreet pretium congue at purus.
            <br />
            <br />
            Curabitur finibus nisl nec nunc venenatis, vitae scelerisque nunc
            suscipit. Sed sagittis dui aliquet neque lacinia efficitur. Sed
            lacus nunc, tempus sed tempor a, maximus eget eros. Donec tincidunt
            fringilla ante non tempus. Quisque sit amet velit eget turpis
            sodales feugiat. Etiam tincidunt risus pellentesque diam aliquet
            tincidunt.
            <br />
            <br />
            Nullam nec quam rutrum, tempor neque vel, consectetur nibh. Nunc
            commodo enim at sagittis gravida. Vivamus quis interdum arcu. Nunc
            posuere congue posuere. Morbi fermentum augue nec tellus mollis,
            quis consequat ante vestibulum. Nullam massa nulla, ornare at nibh
            finibus, ultricies auctor purus. Ut feugiat diam ante, et cursus
            augue volutpat vel.
          </SectionLayoutContent>
          <SectionLayoutContent
            sectionId="section2"
            className="text-sm w-[600px]"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque quis massa neque. In eu aliquet erat. Curabitur vitae
            lacus eu est sagittis tristique eu at leo. Maecenas justo purus,
            mollis et libero quis, consectetur convallis tellus. Etiam sed
            lectus ut augue pharetra ultrices. Suspendisse massa odio, auctor eu
            blandit eget, scelerisque vitae mauris. Quisque eget magna bibendum
            lectus posuere semper. Nullam eget ipsum facilisis, placerat leo
            sed, dapibus mi. Maecenas feugiat felis eros, eu hendrerit mi
            pulvinar at. Proin a massa a elit volutpat euismod. Morbi feugiat
            pulvinar massa, in suscipit dolor tristique ut. Duis congue ex ac
            mauris porta accumsan. <br />
            <br />
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Quisque eget urna aliquet, luctus nisl ut,
            fringilla nisl. Quisque fermentum placerat mi, ac mollis arcu
            pretium at. Sed consequat maximus euismod. Mauris eget maximus nibh.
            <br />
            <br />
            Aliquam est orci, tempus nec convallis sit amet, bibendum ac risus.
            Vivamus quis sapien turpis. Pellentesque luctus, nisi nec gravida
            venenatis, lorem sapien sodales augue, sit amet rhoncus massa diam
            in nisi. Etiam id condimentum leo. Mauris vel ipsum viverra,
            vestibulum purus vitae, cursus nisi.
          </SectionLayoutContent>
        </SectionLayout>
      </article>
    </div>
  ),
};
export const OnlyNavbarStory: Story = {
  parameters: {
    layout: 'centered',
  },

  render: () => {
    const [activeSection, setActiveSection] = useState('default');
    return (
      <div className="w-full">
        <article>
          <SectionLayoutNavbar
            activeSectionId={activeSection}
            sections={[
              { id: 'default', name: 'Yatırımcı Profillerim' },
              { id: 'section2', name: 'Yatırımcılarım' },
            ]}
            onSectionChange={setActiveSection}
          />

          <Card className="mt-4 w-[600px] rounded-sm">
            <SectionLayoutNavbar
              activeSectionId={activeSection}
              sections={[
                { id: 'default', name: 'Yatırımcı Profillerim' },
                { id: 'section2', name: 'Yatırımcılarım' },
              ]}
              onSectionChange={setActiveSection}
            />
          </Card>
        </article>
      </div>
    );
  },
};
