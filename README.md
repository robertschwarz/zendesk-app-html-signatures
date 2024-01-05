# Credits
This app recycles the code & logic of Zignatures, with some improvements (multiple signatures, edit signatures, etc)
https://github.com/zendesk/zignatures

Built with Oleg Gulevskyy's incredible Vite Boilerplate
https://github.com/OlegGulevskyy/zendesk-vite-boilerplate

**APP LOGO**: I took the Zignatures App Logo -> https://github.com/zendesk/zignatures

# What is this?
A Zendesk Support App that uses Zendesk's New Custom Objects to let agents create custom HTML Based Signatures.
The HTML Signature's HTML Content is injected at the `ticket.save` event.
This app lives in the Zendesk Ticket Sidebar and the New Ticket Sidebar.

# Disclaimer
* I haven't tested this app an awful lot, so I won't promise that it runs flawlessly.
* Feel free to use this app and to change it in any way you like 
* I am not committed to continuously update and maintain this repo
* In addition, keep in mind that "badly written" HTML Code in signatures may increase your Spam Score. Using HTML Signatures in Zendesk Tickets may lead to your responses ending up in your customer's spam folder. 

# How to install this?
## Step 1: Enable Custom Objects in Zendesk
1. Go to your Zendesk Admin Center
2. Go to Custom Objects (NOT Legacy Objects) https://`YOUR_DOMAIN`.zendesk.com/admin/objects-rules/custom-objects/objects
3. If not enabled yet, turn on Custom Objects.

## Step 2: Create the "agent_signature" Object
1. Open Custom Objects in the Admin Center https://`YOUR_DOMAIN`.zendesk.com/admin/objects-rules/custom-objects/objects
2. Click `Create object`
3. Create a new Object with the following parameters:
  * Name: "Agent Siganture"
  * Plural: "Agent Signatures"
  * Object Key: "agent_signature"
  * Description: "Custom Object to be used with "Signatures App""

## Step 3: Set up the required fields
1. Open the Agent Signature object
2. Create the field: "HTML Signature"
  * Type: `Multi-line`
  * Name: `HTML Signature`
  * Key: `html_signature`
3. Create the field: "Active"
  * Type: `Checkbox`
  * Name: `Active`
  * Key. `Active`
4. Create the field "Agent"
  * Type: `Lookup Relationship Field`
  * Name: `Agent`
  * Key: `agent`

### Field descriptions
HTML Signature -> Textfield that holds plain HTML Content
Active -> This app lets agents create and manage multiple signatures. Only one can be active at a time. Tells the app which signature to apply
Agent -> Lookup Relationship field so that an Admin can manage agent signatures through an Agent's "Related" tab

## Step 4: Upload the Zendesk App
1. Download the the latest app package https://github.com/robertschwarz/zendesk-app-html-signatures/releases
2. Go to the Apps section of Zendesk's Admin Center https://`{{YOUR_DOMAIN}}`.zendesk.com/admin/apps-integrations/apps/support-apps
3. Click "Upload private app"
4. Set an "App Name" annd upload select the app package
5. Click "Upload" and wait for it to finish
6. Arrange the app at the top or bottom of your app list

# Screenshots
## App Overview
![signature_preview](https://github.com/robertschwarz/zendesk-app-html-signatures/assets/51233710/c5145399-7521-4c1e-9a8a-72d0699677a0)
## Create new Signature
![create_signature](https://github.com/robertschwarz/zendesk-app-html-signatures/assets/51233710/ca8b0ae2-220b-4cb5-a1d9-6d28f5f18295)
## Manage Signatures
![edit_signatures](https://github.com/robertschwarz/zendesk-app-html-signatures/assets/51233710/571043d5-4e32-4e23-b592-99f4b3dfa6a2)
## Edit Signature
![edit_signature](https://github.com/robertschwarz/zendesk-app-html-signatures/assets/51233710/005bd73b-f261-489b-92d9-00f618df350a)
## Ticket Example
![ticket_example](https://github.com/robertschwarz/zendesk-app-html-signatures/assets/51233710/f80a4b28-000a-444f-911e-772b13c382ac)
