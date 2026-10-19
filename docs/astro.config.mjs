import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Factory Specification',
      description:
        'A tetherable Piton specification for a general-purpose agentic factory.',
      sidebar: [
        { label: 'Overview', slug: 'index' },
        {
          label: 'Getting started tutorial',
          items: [
            { label: 'Tutorial overview', slug: 'tutorial' },
            { label: '1. Install Piton', slug: 'tutorial/01-install-piton' },
            { label: '2. Add the factory package', slug: 'tutorial/02-add-factory' },
            { label: '3. Scaffold the factory', slug: 'tutorial/03-scaffold' },
            { label: '4. Onboard', slug: 'tutorial/04-onboard' },
            { label: '5. Submit your first order', slug: 'tutorial/05-first-order' },
            { label: '6. Answer and deliver', slug: 'tutorial/06-answer-deliver' },
            { label: '7. Shut down and verify', slug: 'tutorial/07-shutdown-verify' },
          ],
        },
        {
          label: 'Start here',
          items: [
            { label: 'How it works', slug: 'start/how-it-works' },
            { label: 'Set up in a new project', slug: 'start/setup' },
            { label: 'First run', slug: 'start/quickstart' },
            { label: 'Core concepts', slug: 'start/concepts' },
            { label: 'Why a factory', slug: 'start/why' },
            { label: 'Design choices', slug: 'start/choices' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Onboarding and configuration', slug: 'guides/onboarding' },
            { label: 'Operating a factory', slug: 'guides/operating' },
            { label: 'Planning and dependencies', slug: 'guides/planning' },
            { label: 'Execution', slug: 'guides/execution' },
            { label: 'Delivery and integration', slug: 'guides/delivery' },
            { label: 'Recovery', slug: 'guides/recovery' },
            { label: 'Model routing and budgets', slug: 'guides/routing' },
            { label: 'Security and audit', slug: 'guides/security' },
            { label: 'Self-enhancement', slug: 'guides/evolution' },
            { label: 'Conformance', slug: 'guides/conformance' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'Commands', slug: 'reference/commands' },
            { label: 'States', slug: 'reference/states' },
            { label: 'Descriptor', slug: 'reference/descriptor' },
            { label: 'Operations', slug: 'reference/operations' },
            { label: 'Glossary', slug: 'reference/glossary' },
          ],
        },
      ],
    }),
  ],
});
