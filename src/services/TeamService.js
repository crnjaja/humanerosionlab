export class TeamService {
  static initials(fullName) {
    if (!fullName || typeof fullName !== 'string') return ''

    const parts = fullName.trim().split(/\s+/g).filter(Boolean)
    const first = parts[0]?.[0] ?? ''
    const last = (parts.length > 1 ? parts[parts.length - 1]?.[0] : '') ?? ''

    return (first + last).toUpperCase()
  }

  static normalizeMember(member) {
    return {
      key: member.key || TeamService.slugify(member.name),
      name: member.name || '',
      role: member.role || '',
      bio: member.bio || '',
      email: member.email || '',
      linkedin: member.linkedin || '',
      location: member.location || '',
      photo: member.photo || '',
    }
  }

  static normalizeMembers(members = []) {
    return members.map((member) => TeamService.normalizeMember(member))
  }

  static slugify(value = '') {
    return String(value)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  static mailto(email) {
    return email ? `mailto:${email}` : ''
  }

  static portraitAlt(member) {
    return member?.name ? `Portrait of ${member.name}` : 'Member portrait'
  }

  static emailAriaLabel(member) {
    return member?.name ? `Send an email to ${member.name}` : 'Send an email'
  }

  static linkedinAriaLabel(member) {
    return member?.name ? `${member.name} on LinkedIn` : 'LinkedIn profile'
  }
}
