import { CanDeactivateFn } from "@angular/router";

import { FormComponent } from "../../components/form/form.component";

export const ExitGuard: CanDeactivateFn<FormComponent> = (component) => {
    if (
        component.form.controls.title.dirty || 
        component.form.controls.description.dirty ||
        component.form.controls.price.dirty ||
        component.form.controls.categoryId.dirty
    ) {
        return window.confirm("Do you really want to exit?");
    }
    return true;
}