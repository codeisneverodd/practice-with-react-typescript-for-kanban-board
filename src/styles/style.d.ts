// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
    export interface DefaultTheme {
        textColor: string;
        textBlurColor: string;
        bgColor: string;
        taskColor: string;
        taskDraggingColor: string;
        newTaskColor: string;
        trashCanColor: string;
        boardDraggingOverColor: string;
    }
}