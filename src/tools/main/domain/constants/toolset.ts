import { Tool } from '../../../../shared/types';

type Toolset = Exclude<Tool, Tool.MAIN>;

export const TOOLSETS: Record<Toolset, string> = {
  [Tool.GENERATOR]: 'Generator',
  [Tool.GIT]: 'Git',
  [Tool.SCAFFOLDER]: 'Scaffolder',
};
