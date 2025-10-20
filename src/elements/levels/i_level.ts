import type ICycleComponent from "../../common/definition/i_cycle_component";
import { CycleElementBase } from "../cycle_element_base";

export default interface ILevel extends ICycleComponent {

}

export abstract class LevelBase extends CycleElementBase implements ILevel {
}