import React, { useState, useEffect } from 'react';
import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import { Api } from 'telegram';
import SubHeader from 'src/view/shared/Header/SubHeader';

const TelegramAddUsers = () => {
  const [apiId, setApiId] = useState('');
  const [apiHash, setApiHash] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [password, setPassword] = useState('');
  const [groupLink, setGroupLink] = useState('');
  const [userList, setUserList] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [client, setClient] = useState<TelegramClient | null>(null);
  const [step, setStep] = useState('credentials'); // credentials, phone, code, ready
  const [phoneCodeHash, setPhoneCodeHash] = useState('');
  const [chats, setChats] = useState<any[]>([]);
  const [selectedChatId, setSelectedChatId] = useState('');

  const addLog = (msg: string) => {
    setLogs((prev) => [`${new Date().toLocaleTimeString()} - ${msg}`, ...prev]);
  };

  const initClient = async () => {
    if (!apiId || !apiHash) {
      addLog('Error: API ID and Hash are required.');
      return;
    }
    try {
      addLog('Initializing client...');
      const session = new StringSession('');
      const newClient = new TelegramClient(session, Number(apiId), apiHash, {
        connectionRetries: 5,
      });
      await newClient.connect();
      setClient(newClient);
      setStep('phone');
      addLog('Client initialized. Please enter phone number.');
    } catch (e: any) {
      addLog(`Error initializing: ${e.message}`);
    }
  };

  const sendCode = async () => {
    if (!client || !phoneNumber) return;
    try {
      addLog(`Sending code to ${phoneNumber}...`);
      const { phoneCodeHash } = await client.sendCode({
        apiId: Number(apiId),
        apiHash: apiHash,
        phoneNumber: phoneNumber,
      });
      setPhoneCodeHash(phoneCodeHash);
      setStep('code');
      addLog('Code sent. Please check your Telegram app.');
    } catch (e: any) {
      addLog(`Error sending code: ${e.message}`);
    }
  };

  const signIn = async () => {
    if (!client || !phoneCode) return;
    try {
      addLog('Signing in...');
      await client.invoke(
        new Api.auth.SignIn({
          phoneNumber: phoneNumber,
          phoneCodeHash: phoneCodeHash,
          phoneCode: phoneCode,
        })
      );
      addLog('Signed in successfully!');
      setStep('ready');
      fetchChats(client);
      // Save session? console.log(client.session.save());
    } catch (e: any) {
      if (e.message && e.message.includes('SESSION_PASSWORD_NEEDED')) {
         // Handle 2FA if needed, but for now simple error
         addLog('2FA Password needed (not implemented in this simple UI yet, please disable 2FA or extend code).');
      } else {
        addLog(`Error signing in: ${e.message}`);
      }
    }
  };

  const fetchChats = async (currentClient: TelegramClient) => {
    try {
      addLog('Fetching your groups/channels...');
      const dialogs = await currentClient.getDialogs({});
      // Filter for channels and chats (megagroups)
      const validChats = dialogs.filter((d) => d.isChannel || d.isGroup);
      setChats(validChats);
      addLog(`Found ${validChats.length} groups/channels.`);
    } catch (e: any) {
      addLog(`Error fetching chats: ${e.message}`);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setUserList(content);
        addLog(`Loaded ${content.split('\n').length} users from file.`);
      }
    };
    reader.readAsText(file);
  };

  const startAdding = async () => {
    if (!client || !userList) {
        addLog('Error: Missing client or user list.');
        return;
    }
    
    let targetEntity;
    
    if (selectedChatId) {
         // Find the entity from the chats list
         const chat = chats.find(c => c.id.toString() === selectedChatId);
         if (chat) {
             targetEntity = chat.entity;
             addLog(`Selected target group: ${chat.title}`);
         }
    }

    if (!targetEntity && groupLink) {
         try {
            targetEntity = await client.getEntity(groupLink);
            addLog(`Resolved group link: ${groupLink}`);
         } catch(e: any) {
             addLog(`Error resolving link ${groupLink}: ${e.message}`);
             return;
         }
    }

    if (!targetEntity) {
        addLog('Error: Please select a group or enter a link.');
        return;
    }

    const users = userList.split('\n').map(u => u.trim()).filter(u => u);
    addLog(`Starting to add ${users.length} users...`);

    for (const user of users) {
        try {
          addLog(`Processing ${user}...`);
          const userEntity = await client.getEntity(user);
          await client.invoke(
            new Api.channels.InviteToChannel({
              channel: targetEntity,
              users: [userEntity],
            })
          );
          addLog(`Successfully added ${user}`);
          // Add delay to avoid flood wait
          await new Promise(r => setTimeout(r, 2000));
        } catch (e: any) {
          addLog(`Failed to add ${user}: ${e.message}`);
          if (e.message && e.message.includes('FLOOD_WAIT')) {
             const seconds = Number(e.message.split(' ')[3]);
             addLog(`Flood wait for ${seconds} seconds...`);
             await new Promise(r => setTimeout(r, seconds * 1000));
          }
        }
      }
      addLog('Finished processing list.');
  };

  return (
    <div>
      <SubHeader title="Telegram User Pusher" />
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        
        {step === 'credentials' && (
          <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
            <h3>Step 1: Telegram API Credentials</h3>
            <p>Get these from <a href="https://my.telegram.org" target="_blank" rel="noreferrer">my.telegram.org</a></p>
            <div className="form-group">
              <label>API ID</label>
              <input className="form-control" value={apiId} onChange={e => setApiId(e.target.value)} placeholder="e.g. 12345678" />
            </div>
            <div className="form-group">
              <label>API Hash</label>
              <input className="form-control" value={apiHash} onChange={e => setApiHash(e.target.value)} placeholder="e.g. a1b2c3d4..." />
            </div>
            <button className="btn btn-primary" onClick={initClient}>Next</button>
          </div>
        )}

        {step === 'phone' && (
          <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
             <h3>Step 2: Login</h3>
             <div className="form-group">
              <label>Phone Number (international format, e.g. +1234567890)</label>
              <input className="form-control" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
            </div>
            <button className="btn btn-primary" onClick={sendCode}>Send Code</button>
          </div>
        )}

        {step === 'code' && (
          <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
             <h3>Step 3: Verification</h3>
             <div className="form-group">
              <label>Code</label>
              <input className="form-control" value={phoneCode} onChange={e => setPhoneCode(e.target.value)} />
            </div>
            <button className="btn btn-primary" onClick={signIn}>Sign In</button>
          </div>
        )}

        {step === 'ready' && (
          <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
            <h3>Step 4: Push Users</h3>
            
            <div className="form-group">
              <label>Select Your Group</label>
              <select 
                className="form-control" 
                value={selectedChatId} 
                onChange={e => setSelectedChatId(e.target.value)}
              >
                <option value="">-- Select a Group/Channel --</option>
                {chats.map(chat => (
                    <option key={chat.id.toString()} value={chat.id.toString()}>
                        {chat.title} ({chat.id.toString()})
                    </option>
                ))}
              </select>
              <small className="text-muted">Or enter a link manually below if not listed.</small>
            </div>

            <div className="form-group">
              <label>Group Link / Username (Optional if selected above)</label>
              <input className="form-control" value={groupLink} onChange={e => setGroupLink(e.target.value)} placeholder="@mygroup or https://t.me/..." />
            </div>

            <div className="form-group">
              <label>Users List</label>
              <div style={{ marginBottom: '10px' }}>
                  <input type="file" accept=".txt,.csv" onChange={handleFileUpload} />
                  <small className="text-muted">Upload a .txt file with one username/phone per line.</small>
              </div>
              <textarea 
                className="form-control" 
                rows={10} 
                value={userList} 
                onChange={e => setUserList(e.target.value)} 
                placeholder="@user1&#10;@user2&#10;+1234567890"
              />
            </div>
            <button className="btn btn-success" onClick={startAdding}>Start Adding Users</button>
          </div>
        )}

        <div className="card" style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
          <h4>Logs</h4>
          <div style={{ maxHeight: '300px', overflowY: 'auto', fontFamily: 'monospace' }}>
            {logs.map((log, i) => <div key={i}>{log}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelegramAddUsers;
