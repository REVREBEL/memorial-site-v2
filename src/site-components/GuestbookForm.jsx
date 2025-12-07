"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { NameField } from "./NameField";
import { LocationField } from "./LocationField";
import { FirstMetFormField } from "./FirstMetFormField";
import { RelationshipField } from "./RelationshipField";
import { MessageField } from "./MessageField";
import { EmailFormField } from "./EmailFormField";
import { GuestbookFormButton } from "./GuestbookFormButton";
import * as _utils from "./utils";
import _styles from "./GuestbookForm.module.css";

export function GuestbookForm({
  as: _Component = _Builtin.Block,
  fullNameFormFieldVisibility = true,
  fullNameFormFieldId,
  fullNameFormFieldLabel = "Your Name *",
  fullNameFormIconVisibility = true,
  locationFieldFormFieldVisibility = true,
  locationFieldFormFieldId,
  locationFieldFormFieldLabel = "",
  locationFieldFormIconVisibility = true,
  locationFieldFormInputRuntimeProps = {},
  firstMetFieldFormFieldVisibility = true,
  firstMetFieldFormFieldId,
  firstMetFieldFormFieldLabel = "",
  firstMetFieldFormIconVisibility = true,
  firstMetFieldFormInputRuntimeProps = {},
  relationshipFieldVisibility = true,
  relationshipFieldFormId,
  relationshipFieldFormFieldLabel = "",
  relationshipFieldPlaceholderText = "How do you know her?",

  relationshipFieldInputFieldLink = {
    href: "#",
  },

  relationshipFieldInputFieldRuntimeProps = {},
  relationshipFieldInputFieldSlot,
  relationshipFieldRuntimePropsList = {},
  relationshipFieldRuntimePropsListLink = {},
  relationshipFieldSelectInputDropdownRuntimeProps = {},
  messageFieldVisibility = true,
  messageFieldFormFieldId,
  messageFieldFormFieldLabel = "",
  messageFieldInputFieldId = "Message",
  messageFieldInputFieldRuntimeProps = {},
  messageFieldCharactersVisibility = true,
  messageFieldCharacterLabel = "",
  messageFieldCharactersRuntimeProps = {},
  messageFieldCharactersSlot,
  emailFieldFormFieldId,
  emailFieldFormFieldVisibility = true,
  emailFieldFormFieldLabel = "Email*",
  emailFieldBottomDisclaimerLabel = "",
  emailFieldDisclaimerVisibility = true,
  emailFieldFormIconVisibility = true,
  emailFieldFormInputRuntimeProps = {},
  buttonVisibility = true,
  buttonId,
  buttonButtonIconVisibility = true,
  buttonLabelText = "Sign the Guestbook",
  buttonLoadingMessage = "Signing the Guestbook.....",
  buttonRuntimeProps = {},
  buttonSlot,
  userMessagesSuccessMessageText = "Thank you for signing the Guestbook. It will be displayed shortly, and we appreciate you being part of her tribute.",
  userMessagesErrorMessageText = "Oops! Something went wrong. Please try again or check your details and submit again.",
  componentVisibility = true,
  componentId,
  formComponentRuntimeProps = {},
}) {
  return componentVisibility ? (
    <_Component
      className={_utils.cx(_styles, "component_section-guestbook-form")}
      tag="section"
      id={componentId}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "guestbook_form-padding")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "guestbook_inner-form-container")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "guestbook_component")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "guestbook_form-card")}
              id={_utils.cx(
                _styles,
                "w-node-_3065a81f-17d8-4664-b498-e76322a00682-22a0067e"
              )}
              tag="div"
            >
              <_Builtin.FormWrapper
                className={_utils.cx(_styles, "form_component")}
                {...formComponentRuntimeProps}
              >
                <_Builtin.FormForm
                  className={_utils.cx(_styles, "form_form")}
                  name="wf-form-Contact-Form"
                  data-name="Contact Form"
                  method="get"
                  id="wf-form-Contact-Form"
                >
                  <NameFormField
                    fullNameFormFieldVisibility={fullNameFormFieldVisibility}
                    fullNameFormFieldId={fullNameFormFieldId}
                    fullNameFormFieldLabel={fullNameFormFieldLabel}
                    fullNameFormIconVisibility={fullNameFormIconVisibility}
                  />
                  <LocationFormField
                    locationFormFieldVisibility={
                      locationFieldFormFieldVisibility
                    }
                    locationFormFieldId={locationFieldFormFieldId}
                    locationFormFieldLabel={locationFieldFormFieldLabel}
                    locationFormIconVisibility={locationFieldFormIconVisibility}
                    locationFormInputRuntimeProps={
                      locationFieldFormInputRuntimeProps
                    }
                  />
                  <FirstMetFormField
                    firstMetFormFieldVisibility={
                      firstMetFieldFormFieldVisibility
                    }
                    firstMetFormFieldId={firstMetFieldFormFieldId}
                    firstMetFormFieldLabel={firstMetFieldFormFieldLabel}
                    firstMetFormIconVisibility={firstMetFieldFormIconVisibility}
                    firstMetFormInputRuntimeProps={
                      firstMetFieldFormInputRuntimeProps
                    }
                  />
                  <RelationshipFormField
                    relationshipFieldFormFieldLabel={
                      relationshipFieldFormFieldLabel
                    }
                    relationshipFieldFormFieldVisibility={
                      relationshipFieldVisibility
                    }
                    relationshipFieldFormFieldId={relationshipFieldFormId}
                    relationshipFieldPlaceholderText={
                      relationshipFieldPlaceholderText
                    }
                    relationshipFieldInputFieldRuntimeProps={
                      relationshipFieldInputFieldRuntimeProps
                    }
                    relationshipFieldInputFieldSlot={
                      relationshipFieldInputFieldSlot
                    }
                    relationshipFieldSelectInputFieldRuntimeProps={
                      relationshipFieldRuntimePropsList
                    }
                    relationshipFieldSelectInputLinkRuntimePropsd={
                      relationshipFieldRuntimePropsListLink
                    }
                    relationshipFieldSelectInputLink={
                      relationshipFieldInputFieldLink
                    }
                    relationshipFieldSelectInputDropdownRuntimeProps={
                      relationshipFieldSelectInputDropdownRuntimeProps
                    }
                  />
                  <MessageFormField
                    messageVisibility={messageFieldVisibility}
                    messageFormFieldId={messageFieldFormFieldId}
                    messageFormFieldLabel={messageFieldFormFieldLabel}
                    messageInputFieldId={messageFieldInputFieldId}
                    messageInputFieldRuntimeProps={
                      messageFieldInputFieldRuntimeProps
                    }
                    messageCharactersVisibility={
                      messageFieldCharactersVisibility
                    }
                    messageCharacterLabel={messageFieldCharacterLabel}
                    messageCharactersRuntimeProps={
                      messageFieldCharactersRuntimeProps
                    }
                    messageCharactersSlot={messageFieldCharactersSlot}
                  />
                  <EmailFormField
                    emailFormFieldId={emailFieldFormFieldId}
                    emailFormFieldVisibility={emailFieldFormFieldVisibility}
                    emailFormFieldLabel={emailFieldFormFieldLabel}
                    emailBottomDisclaimerLabel={emailFieldBottomDisclaimerLabel}
                    emailDisclaimerVisibility={emailFieldDisclaimerVisibility}
                    emailFormIconVisibility={emailFieldFormIconVisibility}
                    emailFormInputRuntimeProps={emailFieldFormInputRuntimeProps}
                  />
                  <GuestbookFormButton
                    buttonVisibility={buttonVisibility}
                    buttonId={buttonId}
                    buttonButtonIconVisibility={buttonButtonIconVisibility}
                    buttonLabelText={buttonLabelText}
                    buttonLoadingMessage={buttonLoadingMessage}
                    buttonRuntimeProps={buttonRuntimeProps}
                    buttonSlot={buttonSlot}
                  />
                </_Builtin.FormForm>
                <_Builtin.FormSuccessMessage
                  className={_utils.cx(_styles, "form_message-success")}
                >
                  <_Builtin.Block tag="div">
                    {userMessagesSuccessMessageText}
                  </_Builtin.Block>
                </_Builtin.FormSuccessMessage>
                <_Builtin.FormErrorMessage
                  className={_utils.cx(_styles, "form_message-error")}
                >
                  <_Builtin.Block tag="div">
                    {userMessagesErrorMessageText}
                  </_Builtin.Block>
                </_Builtin.FormErrorMessage>
              </_Builtin.FormWrapper>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  ) : null;
}
