import SelectWidget from './Widgets/SelectWidget'
import TextWidget from './Widgets/TextWidget'
import NumberWidget from './Widgets/NumberWidget'
import RadioWidget from './Widgets/RadioWidget'
import CheckboxWidget from './Widgets/CheckboxWidget'
import IntegerWidget from './Widgets/IntegerWidget'
import BooleanWidget from './Widgets/BooleanWidget'
import FormWrapper from './FormWrapper'
import BtnWrapper from './BtnWrapper'
export default {
  widgets: {
    SelectWidget: SelectWidget,
    TextWidget: TextWidget,
    NumberWidget: NumberWidget,
    RadioWidget: RadioWidget,
    CheckboxWidget: CheckboxWidget,
    IntegerWidget: IntegerWidget,
    BooleanWidget: BooleanWidget
  },
  wrapper: {
    Form: FormWrapper,
    Btn: BtnWrapper
  }
}
